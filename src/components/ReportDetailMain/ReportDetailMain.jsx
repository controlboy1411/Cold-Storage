import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import dayjs from 'dayjs';
import moment from 'moment';
import API from '../../api/api';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SummaryTable from './SummaryTable/SummaryTable.jsx';
import DetailTable from './DetailTable/DetailTable.jsx';
import './ReportDetailMain.scss'

const ReportDetailMain = () => {
    const { t } = useTranslation('translation')
    const [baSelect, setBaSelect] = useState('5096')
    const [plantSelect, setPlantSelect] = useState('')
    const [storageSelect, setStorageSelect] = useState('')
    const [locationSelect, setLocationSelect] = useState('')
    const [fromDateSelect, setFromDateSelect] = useState(dayjs(moment().format('YYYY-MM-DD')))
    const [toDateSelect, setToDateSelect] = useState(dayjs(moment().format('YYYY-MM-DD')))

    const [plants, setPlants] = useState([])
    const [storages, setStorages] = useState([])
    const [locations, setLocations] = useState([])

    const handleChangePlant = (event) => {
        setPlantSelect(event.target.value)
    }

    const handleChangeStorage = (event) => {
        setStorageSelect(event.target.value)
    }

    const handleChangeLocation = (event) => {
        setLocationSelect(event.target.value)
    }

    const handleChangeFromDateSelect = (value) => {
        setFromDateSelect(value)
    }

    const handleChangeToDateSelect = (value) => {
        setToDateSelect(value)
    }

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
        const fetchDataStorage = async () => {
            const resultApi = await API.masterService.getStorages(plantSelect)
            if (resultApi && resultApi.data && resultApi.data.data) {
                setStorages(resultApi.data.data)
                setStorageSelect(resultApi.data.data[0]?.StorageID)
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
                setLocationSelect(resultApi.data.data[0]?.LocationName)
            }
        }
        fetchDataLocation()
    }, [storageSelect])

    return (
        <div>
            <div className='report-detail-container-0'>
                <div className='d-flex flex-row'>
                    <div className='report-detail-title'>{t('report_detail_title')}</div>
                </div>
                <div className='d-flex flex-row'>
                    <div className='report-detail-container-1-sub-1'>
                        <FormControl fullWidth classes={{root: 'report-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_factory_label')}</InputLabel>
                            <Select value={plantSelect} label={t('report_dropdown_factory_label')} onChange={handleChangePlant}>
                                {plants.map(plant => (
                                    <MenuItem value={plant.PlantCode}>{plant.PlantName}</MenuItem>
                                ))} 
                            </Select>
                        </FormControl>
                        <div className='report-detail-container-1-sub-1-distance'></div>
                        <FormControl fullWidth classes={{root: 'report-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_storage_label')}</InputLabel>
                            <Select value={storageSelect} label={t('report_dropdown_storage_label')} onChange={handleChangeStorage}>
                                {storages.map(storage => (
                                    <MenuItem value={storage.StorageID}>{storage.StorageName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='report-detail-container-1-sub-1-distance'></div>
                        <FormControl fullWidth classes={{root: 'report-detail-container-1-sub-1-form-control-root'}}>
                            <InputLabel>{t('report_dropdown_location_label')}</InputLabel>
                            <Select value={locationSelect} label={t('report_dropdown_location_label')} onChange={handleChangeLocation}>
                                {locations.map(location => (
                                    // <MenuItem value={location.LocationID}>{location.LocationName}</MenuItem>
                                    <MenuItem value={location.LocationName}>{location.LocationName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='report-detail-container-1-sub-3'>
                        <div className='report-detail-container-1-sub-3-1'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DemoItem>
                                        <DatePicker label={t('report_dropdown_from_date_label')} format='DD-MM-YYYY' className='information-tab-date-picker'
                                            value={fromDateSelect}
                                            onChange={(newValue) => handleChangeFromDateSelect(newValue)}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='report-detail-container-1-sub-3-1'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DemoItem>
                                        <DatePicker label={t('report_dropdown_to_date_label')} format='DD-MM-YYYY' className='information-tab-date-picker'
                                            value={toDateSelect}
                                            onChange={(newValue) => handleChangeToDateSelect(newValue)}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='report-detail-container-1-sub-3-2'>
                            <Button variant='contained' startIcon={<ImportExportIcon fontSize='small' />} classes={{root: 'report-detail-btn-root'}}
                                sx={{width: '125px', height: '30px', fontSize: '13px'}}
                            >
                                Xuất Excel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='report-detail-container-1'>
                <div className='report-detail-sub-title'>{t('report_detail_sub_title_1')}</div>
                <SummaryTable baCode={baSelect} plantCode={plantSelect} storageId={storageSelect} 
                    locationId={locationSelect} fromDate={fromDateSelect} toDate={toDateSelect}
                />
            </div>
            <div className='report-detail-container-1'>
                <div className='report-detail-sub-title'>{t('report_detail_sub_title_2')}</div>
                <DetailTable baCode={baSelect} plantCode={plantSelect} storageId={storageSelect} 
                    locationId={locationSelect} fromDate={fromDateSelect} toDate={toDateSelect}
                />
            </div>
            <div className='report-detail-bottom'></div>
        </div>
    )
}

export default ReportDetailMain