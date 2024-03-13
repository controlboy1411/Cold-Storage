import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import moment from 'moment';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ChartView from './ChartView/ChartView.jsx';
import ReportTable from './ReportTable/ReportTable.jsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParams } from '../../hook.jsx';
import { ChartConfig } from '../../config/app.config.js';
import { QUERY_PARAM } from '../../config/routes.config.js';
import API from '../../api/api.js';
import './DashboardDetail.scss';

const tempPointsInit = []
const humiPointsInit = []

for (let i = 0; i < 24; i++) {
    tempPointsInit.push({x: i, y: 0})
    humiPointsInit.push({x: i, y: 0})
}

const DashboardDetail = () => {
    const queryParams = useQueryParams()
    const [baSelect, setBaSelect] = useState(queryParams[QUERY_PARAM.BA_CODE])
    const [plantSelect, setPlantSelect] = useState('')
    const [storageSelect, setStorageSelect] = useState('')
    const [locationSelect, setLocationSelect] = useState('')
    const [dateSelect, setDateSelect] = useState(dayjs(moment().format('YYYY-MM-DD')))

    const [plants, setPlants] = useState([])
    const [storages, setStorages] = useState([])
    const [locations, setLocations] = useState([])

    const [tempDataPoints, setTempDataPoints] = useState(tempPointsInit)
    const [humiDataPoints, setHumiDataPoints] = useState(humiPointsInit)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [totalData, setTotalData] = useState(0)
    const [rows, setRows] = useState([])

    const { t } = useTranslation("translation")

    const handleChangePlant = (event) => {
        setPlantSelect(event.target.value);
        setDateSelect(dayjs(moment().format('YYYY-MM-DD')))
    }

    const handleChangeStorage = (event) => {
        setStorageSelect(event.target.value);
        setDateSelect(dayjs(moment().format('YYYY-MM-DD')))
    }

    const handleChangeLocation = (event) => {
        setLocationSelect(event.target.value);
        setDateSelect(dayjs(moment().format('YYYY-MM-DD')))
    }

    const handleChangeDateSelect = (value) => {
        setDateSelect(value)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchDataPlant = async () => {
            const resultApi = await API.masterService.getPlants(baSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setPlants(resultApi.data.data)
                setPlantSelect(queryParams[QUERY_PARAM.PLANT_CODE])
            }
        }
        fetchDataPlant()
    }, [baSelect])

    useEffect(() => {
        const fetchDataStorage = async () => {
            const resultApi = await API.masterService.getStorages(plantSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setStorages(resultApi.data.data)
                setStorageSelect(Number(queryParams[QUERY_PARAM.STORAGE_ID]))
            }
        }
        fetchDataStorage()
    }, [plantSelect])

    useEffect(() => {
        const fetchDataLocation = async () => {
            const resultApi = await API.masterService.getLocations(storageSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setLocations(resultApi.data.data)
                // setLocationSelect(resultApi.data.data[0]?.LocationID)
                setLocationSelect(queryParams[QUERY_PARAM.LOCATION_ID])
                setDateSelect(dayjs(moment().format('YYYY-MM-DD')))
            }
        }
        fetchDataLocation()
    }, [storageSelect])

    useEffect(() => {
        const fetchChartData = async () => {
            const dateChart = dayjs(dateSelect).format('YYYY-MM-DD')
            const resultApi = await API.dashboardService.getLineChartData(baSelect, plantSelect, storageSelect, locationSelect, dateChart)
    
            if (resultApi && resultApi.data && resultApi.data.data) {
                if (resultApi.data.data.temp && Array.isArray(resultApi.data.data.temp)) {
                    let tempPoints = []
                    for (let i = 0; i < resultApi.data.data.temp.length; i++) {
                        if (i !== 0 && i % 3 === 0) {
                            tempPoints.push({
                                x: Number(resultApi.data.data.temp[i].x),
                                y: Number(resultApi.data.data.temp[i].y),
                                indexLabel: '{y}\u2103'
                            })
                        } else {
                            tempPoints.push({
                                x: Number(resultApi.data.data.temp[i].x),
                                y: Number(resultApi.data.data.temp[i].y),
                            })
                        }
                    }
                    setTempDataPoints(tempPoints)
                }
    
                if (resultApi.data.data.humi && Array.isArray(resultApi.data.data.humi)) {
                    let humiPoints = []
                    for (let i = 0; i < resultApi.data.data.humi.length; i++) {
                        if (i !== 0 && i % 3 === 0) {
                            humiPoints.push({
                                x: resultApi.data.data.humi[i].x,
                                y: Number(resultApi.data.data.humi[i].y),
                                indexLabel: '{y}%'
                            })
                        } else {
                            humiPoints.push({
                                x: Number(resultApi.data.data.humi[i].x),
                                y: Number(resultApi.data.data.humi[i].y),
                            })
                        }
                    }
                    setHumiDataPoints(humiPoints)
                }
            }
        }
        fetchChartData()
    }, [dateSelect])

    useEffect(() => {
        const fetchReportTableData = async () => {
            const dateChart = dayjs(dateSelect).format('YYYY-MM-DD')
            const resultApi = await API.dashboardService.getReportTableData(baSelect, plantSelect, storageSelect, locationSelect, dateChart, page, rowsPerPage)
    
            if (resultApi && resultApi.data && resultApi.data.data) {
                setTotalData(resultApi.data.data?.total || 0)
                setRows(resultApi.data.data?.data || [])
            }
        }
        fetchReportTableData()
    }, [dateSelect, page, rowsPerPage])

    return (
        <div>
            <div className='dashboard-detail-title-1'>{t('report_title')}</div>
            <div className='dashboard-detail-container-0'>
                <div className='dashboard-detail-title'>{t('report_title')}</div>
                <div className='dashboard-detail-container-1'>
                    <div className='dashboard-detail-container-1-sub-1'>
                        <FormControl fullWidth classes={{root: 'dashboard-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_factory_label')}</InputLabel>
                            <Select value={plantSelect} label={t('report_dropdown_factory_label')} onChange={handleChangePlant}>
                                {plants.map(plant => (
                                    <MenuItem value={plant.PlantCode}>{plant.PlantName}</MenuItem>
                                ))} 
                            </Select>
                        </FormControl>
                        <div className='dashboard-detail-container-1-sub-1-distance'></div>
                        <FormControl fullWidth classes={{root: 'dashboard-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_storage_label')}</InputLabel>
                            <Select value={storageSelect} label={t('report_dropdown_storage_label')} onChange={handleChangeStorage}>
                                {storages.map(storage => (
                                    <MenuItem value={storage.StorageID}>{storage.StorageName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='dashboard-detail-container-1-sub-1-distance'></div>
                        <FormControl fullWidth classes={{root: 'dashboard-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_location_label')}</InputLabel>
                            <Select value={locationSelect} label={t('report_dropdown_location_label')} onChange={handleChangeLocation}>
                                {locations.map(location => (
                                    // <MenuItem value={location.LocationID}>{location.LocationName}</MenuItem>
                                    <MenuItem value={location.LocationName}>{location.LocationName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='dashboard-detail-container-1-sub-3'>
                        <div className='dashboard-detail-container-1-sub-3-1'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DemoItem>
                                        <DatePicker label={t('report_dropdown_date_label')} format='DD-MM-YYYY' className='information-tab-date-picker'
                                            value={dateSelect}
                                            onChange={(newValue) => handleChangeDateSelect(newValue)}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='dashboard-detail-container-1-sub-3-distance'></div>
                        <div className='dashboard-detail-container-1-sub-3-2'>
                            <Button variant="contained" startIcon={<SimCardDownloadIcon fontSize='small'/>} classes={{root: 'dashboard-detail-container-1-sub-3-2-btn-root'}}
                                sx={{width: '140px', height: '35px', fontSize: '13px'}}
                            >
                                {t('report_export_label')}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='dashboard-detail-container-2'>
                    <div className='dashboard-detail-container-2-chart'>
                        <ChartView chartType={ChartConfig.ChartType.Temp} points={tempDataPoints}/>
                    </div>
                    <div className='dashboard-detail-container-2-distance'></div>
                    <div className='dashboard-detail-container-2-chart'>
                        <ChartView chartType={ChartConfig.ChartType.Humi} points={humiDataPoints}/>
                    </div>    
                </div>
                <ReportTable rows={rows} totalData={totalData} rowsPerPage={rowsPerPage} page={page} 
                    handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <div className='dashboard-detail-padding-bottom'></div>
            </div>
        </div>
    )
}

export default DashboardDetail;