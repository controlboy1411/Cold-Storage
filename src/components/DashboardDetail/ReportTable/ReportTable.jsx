import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined.js';
import ClockIcon from '@mui/icons-material/AvTimerOutlined.js'
import { useTranslation } from "react-i18next";
import './ReportTable.scss';

const ReportTable = (props) => {
    const { rows, totalData, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = props
    const { t } = useTranslation("translation")
    const columns = [
        { id: 'stt', label: t('report_table_column_stt'), minWidth: 20 },
        { id: 'time', label: t('report_table_column_time'), minWidth: 150 },
        { id: 'temp', label: t('report_table_column_temp'), minWidth: 180 },
        { id: 'humi', label: t('report_table_column_humi'), minWidth: 180 },
        { id: 'std', label: t('report_table_column_std'), minWidth: 150 },
        { id: 'overStd', label: t('report_table_column_ovr_std'), minWidth: 150 },
    ];

    const formatReportTime = (recordTime) => {
        let formatTime = ''
        let year = String(recordTime).substring(0, 4)
        let month = String(recordTime).substring(5, 7)
        let day = String(recordTime).substring(8, 10)
        let time = String(recordTime).substring(11, 16)
        formatTime = `${time} ${day}/${month}/${year}`
        return formatTime
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '2.5rem' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} align='center' className='dashboard-detail-table-header-cell' 
                                style={{ backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-detail-table-cell-root'}}
                            >
                                {
                                    column.id === 'time' ? <ClockIcon className='dashboard-detail-table-header-cell-icon'/> :
                                    column.id === 'temp' ? <DeviceThermostatIcon className='dashboard-detail-table-header-cell-icon'/> :
                                    column.id === 'humi' ? <WaterDropOutlinedIcon className='dashboard-detail-table-header-cell-icon'/> :
                                    column.id === 'std' ? <InfoOutlinedIcon className='dashboard-detail-table-header-cell-icon'/> :
                                    column.id === 'overStd' ? <InfoOutlinedIcon className='dashboard-detail-table-header-cell-icon'/> : <></>
                                }
                                <span className='dashboard-detail-table-header-cell-label'>{column.label}</span>
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={`report-table-row-${index}`}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align='center' style={{fontWeight: 'normal'}} classes={{root: 'dashboard-detail-table-cell-root'}}>
                                        {
                                            column.id === 'std' ? (
                                                <div className='dashboard-detail-table-body-cell-std'>
                                                    <div className='dashboard-detail-table-cell-std'>{value.temp}&deg;C</div>
                                                    <div className='dashboard-detail-table-cell-std'>{value.humi}%</div>
                                                </div>
                                            ) :
                                            column.id === 'overStd' ? (
                                                <div className='dashboard-detail-table-body-cell-std'>
                                                    <div className='dashboard-detail-table-cell-std'>{value.temp}&deg;C</div>
                                                    <div className='dashboard-detail-table-cell-std'>{value.humi}%</div>
                                                </div>
                                            ) :
                                            column.id === 'temp' ? (
                                                <span className='dashboard-detail-table-cell-value'>{value}&deg;C</span>
                                            ) :
                                            column.id === 'humi' ? (
                                                <span className='dashboard-detail-table-cell-value'>{value}%</span>
                                            ) : 
                                            column.id === 'time' ? (
                                                <span className='dashboard-detail-table-cell-value'>{formatReportTime(value)}</span>
                                            ) : (
                                                <span className='dashboard-detail-table-cell-value'>{value}</span>
                                            )
                                        }
                                    </TableCell>
                                )
                            })}
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[50, 100, 200]}
                labelRowsPerPage={t('table_paging_title')}
                labelDisplayedRows={({ from, to, count }) => { return `${from}-${to} ${t('table_paging_of')} ${count}`}}
                component="div"
                count={totalData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ReportTable;