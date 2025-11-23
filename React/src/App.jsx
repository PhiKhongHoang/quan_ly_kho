import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Link, Outlet } from 'react-router-dom';
import { getAccountAPI } from './service/api.service';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Button, Result, Spin } from 'antd';
import PrivateRoute from './pages/private.route';

const App = () => {
  const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)


  useEffect(() => {
    fetchUserInfo()
  }, [])


  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    if (res.data) {
      // success
      setUser(res.data.user)

    }

    setIsAppLoading(false)
  }

  return (
    <>
      {isAppLoading === true
        ?
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          {/* <Spin /> */}
          <Result
            status="403"
            title="Unauthorized!"
            subTitle="Bạn cần đăng nhập và có quyền truy cập tài nguyên này."
            extra={
              <Button type="primary">
                <Link to="/login">
                  <span>Go to login</span>
                </Link>
              </Button>
            }
          />
        </div>
        :
        <>
          <PrivateRoute requireAuthOnly={true}>
            <Header />
            <Outlet />
            <Footer />
          </PrivateRoute>

        </>
      }
    </>
  )
}

export default App
