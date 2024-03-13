import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import API from '../../../api/api';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import './SummaryTable.scss';


const SummaryTable = (props) => {
    const { t } = useTranslation('translation')
    const { baCode, plantCode, storageId, locationId, fromDate, toDate } = props
    const [dataRows, setDataRows] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fromDateFormat = dayjs(fromDate).format('YYYY-MM-DD')
            const toDateFormat = dayjs(toDate).format('YYYY-MM-DD')
            const resultApi = await API.dashboardService.getSummaryData(baCode, plantCode, storageId, locationId, fromDateFormat, toDateFormat)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setDataRows(resultApi.data.data)
            }
        }
        fetchData()
    }, [baCode, plantCode, storageId, locationId, fromDate, toDate])

    return (
        <div className='mt-2'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='summary-table-header' sx={{width: '300px'}}></TableCell>
                            <TableCell align='center' className='summary-table-header'>{t('report_table_column_temp')} (&deg;C)</TableCell>
                            <TableCell align='center' className='summary-table-header'>{t('report_table_column_humi')} (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataRows.map((row) => (
                        <TableRow>
                            <TableCell align='left'>{t(row.desc)}</TableCell>
                            <TableCell align='center'>{row.temp}</TableCell>
                            <TableCell align='center'>{row.humi}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SummaryTable