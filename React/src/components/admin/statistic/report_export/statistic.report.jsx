import React from 'react'
import ReportMonthPage from './statistic.report.month';
import ReportYearPage from './statistic.report.year';

const ReportPage = () => {

    return (
        <>
            <div>
                <ReportMonthPage />
            </div>

            <div style={{ height: 40, width: "100%", backgroundColor: "#ccc", marginTop: 20, marginBottom: 20 }}></div>

            <div>
                <ReportYearPage />
            </div>
        </>
    );
}

export default ReportPage;
