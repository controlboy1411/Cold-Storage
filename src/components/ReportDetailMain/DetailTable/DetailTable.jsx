import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import API from '../../../api/api';
import dayjs from 'dayjs';
import './DetailTable.scss';

const DetailTable = (props) => {
    const { t } = useTranslation('translation')
    const { baCode, plantCode, storageId, locationId, fromDate, toDate } = props

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [totalData, setTotalData] = useState(0)
    const [dataRows, setDataRows] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            const _fromDate = dayjs(fromDate).format('YYYY-MM-DD')
            const _toDate = dayjs(toDate).format('YYYY-MM-DD')
            const resultApi = await API.dashboardService.getDetailData(baCode, plantCode, storageId, locationId, _fromDate, _toDate, page, rowsPerPage)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setDataRows(resultApi.data.data.data)
                setTotalData(resultApi.data.data.total)
            }
        }
        fetchData()
    }, [baCode, plantCode, storageId, locationId, fromDate, toDate, page, rowsPerPage])

    return (
        <div className='mt-2'>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' className='detail-table-header' sx={{width: '200px'}}>{t('report_table_column_stt')}</TableCell>
                                <TableCell align='center' className='detail-table-header'>{t('report_table_column_temp')} (&deg;C)</TableCell>
                                <TableCell align='center' className='detail-table-header'>{t('report_table_column_humi')} (%)</TableCell>
                                <TableCell align='center' className='detail-table-header'>{t('report_table_column_time')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataRows.map((row, index) => (
                            <TableRow>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='center'>{row.Temperature}</TableCell>
                                <TableCell align='center'>{row.Humidity}</TableCell>
                                <TableCell align='center'>{row.Time}</TableCell>
                            </TableRow>
                        ))}
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
        </div>
    )
}

export default DetailTable