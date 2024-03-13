import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import ReportIcon from '@mui/icons-material/Report';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DevicesIcon from '@mui/icons-material/Devices';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQueryParams, useSetQueryParams } from '../../hook';
import { useTranslation } from 'react-i18next';
import { QUERY_PARAM, ROUTE_PATH } from '../../config/routes.config';
import moment from 'moment/moment.js';
import API from '../../api/api';
import './DashboardCommon.scss';

const DashboardRow = (props) => {
    const { rowData, index, baCode, plantCode } = props
    const [openRow, setOpenRow] = useState(false)

    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const handleClickTableRow = (locationId) => {
        setQueryParams(ROUTE_PATH.REPORT, { 
            ...queryParams,
            [QUERY_PARAM.BA_CODE]: baCode,
            [QUERY_PARAM.PLANT_CODE]: plantCode,
            [QUERY_PARAM.STORAGE_ID]: rowData.storageID,
            [QUERY_PARAM.LOCATION_ID]: locationId
        })
    }

    return (
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} key={`dashboard-row-index-${index}`} sx={{cursor: 'pointer'}}>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenRow(!openRow)}>
                        {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}
                    onClick={() => handleClickTableRow(rowData.dataLocation[0].locationName)}
                >
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <MapsHomeWorkIcon className='dashboard-common-table-body-cell-icon'/>
                        <span className='dashboard-common-table-body-cell-value'>{rowData.storageName}</span>
                    </div>
                </TableCell>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}
                    onClick={() => handleClickTableRow(rowData.dataLocation[0].locationName)}
                >
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <span className='dashboard-common-table-body-cell-value'>{rowData.dataLocation[0].locationName}</span>
                    </div>
                </TableCell>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}
                    onClick={() => handleClickTableRow(rowData.dataLocation[0].locationName)}
                >
                    <div className='dashboard-common-table-cell-progress-container'>
                        <div className='dashboard-common-table-cell-linear-progress'>
                            <LinearProgress 
                                color='secondary' 
                                variant='determinate' 
                                value={Number(rowData.dataLocation[0].temp)}
                                classes={{
                                root: 'dashboard-common-table-cell-linear-progress-root',
                                bar1Determinate: rowData.dataLocation[0].isOverStd.temp ? 
                                    'dashboard-common-table-cell-linear-progress-bar-out-std' : 
                                    'dashboard-common-table-cell-linear-progress-bar-in-std'
                                }}
                            />
                        </div>
                        <div>{rowData.dataLocation[0].temp}&deg;C</div>
                    </div>
                </TableCell>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}
                    onClick={() => handleClickTableRow(rowData.dataLocation[0].locationName)}
                >
                    <div className='dashboard-common-table-cell-progress-container'>
                        <div className='dashboard-common-table-cell-linear-progress'>
                            <LinearProgress 
                                color='secondary' 
                                variant='determinate' 
                                value={Number(rowData.dataLocation[0].humi)}
                                classes={{
                                    root: 'dashboard-common-table-cell-linear-progress-root',
                                    bar1Determinate: rowData.dataLocation[0].isOverStd.humi ? 
                                        'dashboard-common-table-cell-linear-progress-bar-out-std' : 
                                        'dashboard-common-table-cell-linear-progress-bar-in-std'
                                    }}
                            />
                        </div>
                        <div>{rowData.dataLocation[0].humi}%</div>
                    </div>
                </TableCell>
                <TableCell sx={{borderBottomWidth: openRow && rowData.dataLocation.length > 1 ? '0px' : '1px'}}
                    onClick={() => handleClickTableRow(rowData.dataLocation[0].locationName)}
                >
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <div className='dashboard-common-table-cell-std'>{rowData.dataLocation[0].std.temp}&deg;C</div>
                        <div className='dashboard-common-table-cell-std'>{rowData.dataLocation[0].std.humi}%</div>
                        <div className='dashboard-common-table-cell-std-report'>
                            {(rowData.dataLocation[0].isOverStd.temp || rowData.dataLocation[0].isOverStd.humi) ? 
                                <ReportIcon sx={{color: '#d43d1c'}}/> :
                                <div className='dashboard-common-table-cell-std-no-warning'></div>
                            }
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            {openRow && rowData.dataLocation?.slice(1)?.map((location, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={`dashboard-row-index-${index}`} sx={{cursor: 'pointer'}}
                    onClick={() => handleClickTableRow(location.locationName)}
                >
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }} />
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }} />
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }}>
                        <div className='d-flex flex-row align-items-center justify-content-center'>
                            <span className='dashboard-common-table-body-cell-value'>{location.locationName}</span>
                        </div>
                    </TableCell>
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }}>
                        <div className='dashboard-common-table-cell-progress-container'>
                            <div className='dashboard-common-table-cell-linear-progress'>
                                <LinearProgress 
                                    color='secondary' 
                                    variant='determinate' 
                                    value={Number(location.temp)}
                                    classes={{
                                        root: 'dashboard-common-table-cell-linear-progress-root',
                                        bar1Determinate: location.isOverStd.temp ? 
                                            'dashboard-common-table-cell-linear-progress-bar-out-std' : 
                                            'dashboard-common-table-cell-linear-progress-bar-in-std'
                                    }}
                                />
                            </div>
                            <div>{location.temp}&deg;C</div>
                        </div>
                    </TableCell>
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }}>
                        <div className='dashboard-common-table-cell-progress-container'>
                            <div className='dashboard-common-table-cell-linear-progress'>
                                <LinearProgress 
                                    color='secondary' 
                                    variant='determinate' 
                                    value={Number(location.humi)}
                                    classes={{
                                        root: 'dashboard-common-table-cell-linear-progress-root',
                                        bar1Determinate: location.isOverStd.humi ? 
                                            'dashboard-common-table-cell-linear-progress-bar-out-std' : 
                                            'dashboard-common-table-cell-linear-progress-bar-in-std'
                                    }}
                                />
                            </div>
                            <div>{location.humi}%</div>
                        </div>
                    </TableCell>
                    <TableCell sx={{borderBottomWidth: index === rowData.dataLocation.length - 2 ? '1px' : '0px' }}>
                        <div className='d-flex flex-row align-items-center justify-content-center'>
                            <div className='dashboard-common-table-cell-std'>{location.std.temp}&deg;C</div>
                            <div className='dashboard-common-table-cell-std'>{location.std.humi}%</div>
                            <div className='dashboard-common-table-cell-std-report'>
                                {(location.isOverStd.temp || location.isOverStd.humi) ? 
                                    <ReportIcon sx={{color: '#d43d1c'}}/> :
                                    <div className='dashboard-common-table-cell-std-no-warning'></div>
                                }
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </React.Fragment>
    )
}

const DashboardCommon = () => {
    const momentFormatTime = 'hh:mm A'
    const momentFormatDate = 'DD MMMM YYYY'
    const { t } = useTranslation('translation')
    
    let time = moment()
	const [currentTime, setCurrentTime] = useState(time.format(momentFormatTime) + ' ' + time.format(momentFormatDate))

    const [baSelect, setBaSelect] = useState('5096')
    const [plantSelect, setPlantSelect] = useState('')

    const [plants, setPlants] = useState([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [totalData, setTotalData] = useState(0)
    const [rows, setRows] = useState([])

    const handleChangePlant = (event) => {
        setPlantSelect(event.target.value)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    setInterval(() => {
		let time = moment()
		setCurrentTime(time.format(momentFormatTime) + ' ' + time.format(momentFormatDate))
	}, 60000)
    
    useEffect(() => {
        const fetchDataPlant = async () => {
            const resultApi = await API.masterService.getPlants(baSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setPlants(resultApi.data.data)
                setPlantSelect(resultApi.data.data[0]?.PlantCode)
            }
        }
        fetchDataPlant()
    }, [baSelect])

    useEffect(() => {
        const fetchDashboardData = async () => {
            const resultApi = await API.dashboardService.getDashboardMainData(baSelect, plantSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setRows(resultApi.data.data)
            }
        }
        fetchDashboardData()
    }, [plantSelect])

    return (
        <div>
            <div className='dashboard-common-title-1'>{t('dashboard_title')}</div>
            <div className='dashboard-common-container-0'>
                <div className='dashboard-common-title'>{t('dashboard_title')}</div>
                <div className='d-flex flex-row-reverse'>
                    <div className='dashboard-common-container-1-sub-2-2'>{currentTime}</div>
                </div>
                <div className='dashboard-common-container-1 d-flex flex-row align-items-center'>
                    <div className='dashboard-common-container-1-sub-1'>
                        <div className='dashboard-common-container-1-sub-1-1'>
                            <FormControl fullWidth>
                                <InputLabel>{t('dashboard_dropdown_factory_label')}</InputLabel>
                                <Select value={plantSelect} label={t('dashboard_dropdown_factory_label')} onChange={handleChangePlant}>
                                    {plants.map(plant => (
                                        <MenuItem value={plant.PlantCode}>{plant.PlantName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className='dashboard-common-container-1-sub-2'>{currentTime}</div>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' width='80px' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}/>
                                    <TableCell align='center' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}>
                                        <StorageIcon className='dashboard-common-table-header-cell-icon' sx={{marginRight: '5px'}}/>
                                        <span className='dashboard-common-table-header-cell-label'>{t('dashboard_column_name_storage')}</span>
                                    </TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}>
                                        <DevicesIcon className='dashboard-common-table-header-cell-icon' sx={{marginRight: '5px'}}/>
                                        <span className='dashboard-common-table-header-cell-label'>{t('dashboard_column_name_location')}</span>
                                    </TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}>
                                        <DeviceThermostatIcon className='dashboard-common-table-header-cell-icon'/>
                                        <span className='dashboard-common-table-header-cell-label'>{t('dashboard_column_name_temperature')}</span>
                                    </TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}>
                                        <WaterDropOutlinedIcon className='dashboard-common-table-header-cell-icon'/>
                                        <span className='dashboard-common-table-header-cell-label'>{t('dashboard_column_name_humidity')}</span>
                                    </TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold', backgroundColor: '#EEF7FE' }} classes={{root: 'dashboard-common-table-cell-root'}}>
                                        <InfoIcon className='dashboard-common-table-header-cell-icon'/>
                                        <span className='dashboard-common-table-header-cell-label'>{t('dashboard_column_name_standard')}</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <DashboardRow index={index} rowData={row} baCode={baSelect} plantCode={plantSelect} />
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
        </div>
    )
}

export default DashboardCommon;