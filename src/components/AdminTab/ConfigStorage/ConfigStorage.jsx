import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminContext } from '../../../context/AdminContext';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { convert_DD_MM_YYYY_to_YYYY_MM_DD } from '../../../utils/helper';
import dayjs from 'dayjs';
import moment from 'moment';
import API from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './ConfigStorage.scss';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translate(-100%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderWidth: 0,
    boxShadow: 24,
    height: '100vh'
};

const ConfigStorage = (props) => {
    const { parrentPlant, storageConfig } = props
    const context = useContext(AdminContext)
    const { t } = useTranslation('translation')

    const [storageInfor, setStorageInfor] = useState({
        storageId: storageConfig?.storageId || 0,
        storageName: storageConfig?.storageName || '',
        status: storageConfig?.status || '',
        tempMax: storageConfig?.standard?.temp?.split('-')[1] || '',
        tempMin: storageConfig?.standard?.temp?.split('-')[0] || '',
        humiMax: storageConfig?.standard?.humi?.split('-')[1] || '',
        humiMin: storageConfig?.standard?.humi?.split('-')[0] || '',
        effectiveDate: storageConfig?.effectiveDate ? convert_DD_MM_YYYY_to_YYYY_MM_DD(storageConfig?.effectiveDate) : moment().format('YYYY-MM-DD')
    })
    const [confirm, setConfirm] = useState(false)
    
    const handleChangeValueStorage = (paramName, value) => {
        setStorageInfor(prev => ({...prev, [paramName]: value}))
    }

    const handleClose = () => context.setOpenPopupConfigStorage(false)

    const handleClickConfirmButton = () => {
        setConfirm(true)
    }

    useEffect(() => {
        setStorageInfor({
            storageId: storageConfig?.storageId || 0,
            storageName: storageConfig?.storageName || '',
            status: storageConfig?.status ? (storageConfig?.status === 'Active' ? 1 : 0) : '',
            tempMax: storageConfig?.standard?.temp?.split('-')[1] || '',
            tempMin: storageConfig?.standard?.temp?.split('-')[0] || '',
            humiMax: storageConfig?.standard?.humi?.split('-')[1] || '',
            humiMin: storageConfig?.standard?.humi?.split('-')[1] || '',
            effectiveDate: storageConfig?.effectiveDate ? convert_DD_MM_YYYY_to_YYYY_MM_DD(storageConfig?.effectiveDate) : moment().format('YYYY-MM-DD')
        })
    }, [storageConfig])

    useEffect(() => {
        if (confirm) {
            const postData = async () => {
                initToast(ToastId.ConfigStorage)
                try {
                    const resultApi = await API.adminService.configStorage(storageInfor)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setOpenPopupConfigStorage(false)
                        context.setRefreshDataTable(prev => !prev)
                        toast.update(ToastId.ConfigStorage, { 
                            render: "Cấu hình kho thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.ConfigStorage, { 
                            render: resultApi.data.message || "Cấu hình kho thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                }  catch (err) {
                    toast.update(ToastId.ConfigStorage, { 
                        render: err.response.data.message || "Cấu hình kho thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setConfirm(false)
            }
            postData()
        }
    }, [confirm])

    return (
        <div>
            <Modal 
                open={context.openPopupConfigStorage} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='config-storage-popup'
            >
                <Box sx={modalStyle}>
                    <div className='config-storage-popup-header'>
                        <div className='config-storage-popup-header-title'>{t('config_storage_popup_title')}</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='config-storage-popup-body'>
                        <div className='config-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_code')}
                                placeholder={t('add_new_factory_popup_factory_code_placeholder')} fullWidth
                                value={parrentPlant?.plantCode || ''} disabled
                            />
                        </div>
                        <div className='config-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_name')}
                                placeholder={t('add_new_factory_popup_factory_name_placeholder')} fullWidth
                                value={parrentPlant?.plantName || ''} disabled
                            />
                        </div>
                        <div className='config-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_storage_popup_storage_name')}
                                placeholder={t('add_new_storage_popup_storage_name_placeholder')} fullWidth
                                value={storageInfor.storageName} onChange={(event) => handleChangeValueStorage('storageName', event.target.value)}
                            />
                        </div>
                        <div className='config-storage-popup-body-text-field'>
                            <FormControl fullWidth>
                                <InputLabel>{t('popup_dropdown_status')}</InputLabel>
                                <Select label={t('popup_dropdown_status')} 
                                    value={storageInfor.status} onChange={(event) => handleChangeValueStorage('status', event.target.value)}
                                >
                                    <MenuItem value={1}>{t('popup_dropdown_status_active')}</MenuItem>
                                    <MenuItem value={0}>{t('popup_dropdown_status_no_active')}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='config-storage-popup-body-text-field'>
                            <Stack direction='row' spacing={2}>
                                <TextField  variant="outlined" label={t('config_storage_popup_temp_min')}
                                    placeholder={t('config_storage_popup_temp_min')} fullWidth
                                    value={storageInfor.tempMin} onChange={(event) => handleChangeValueStorage('tempMin', event.target.value)}
                                />
                                <TextField  variant="outlined" label={t('config_storage_popup_temp_max')}
                                    placeholder={t('config_storage_popup_temp_max')} fullWidth
                                    value={storageInfor.tempMax} onChange={(event) => handleChangeValueStorage('tempMax', event.target.value)}
                                />
                            </Stack>
                        </div>
                        <div className='config-storage-popup-body-text-field-2'>
                            <Stack direction='row' spacing={2}>
                                <TextField  variant="outlined" label={t('config_storage_popup_humi_min')}
                                    placeholder={t('config_storage_popup_humi_min')} fullWidth
                                    value={storageInfor.humiMin} onChange={(event) => handleChangeValueStorage('humiMin', event.target.value)}
                                />
                                <TextField  variant="outlined" label={t('config_storage_popup_humi_max')}
                                    placeholder={t('config_storage_popup_humi_max')} fullWidth
                                    value={storageInfor.humiMax} onChange={(event) => handleChangeValueStorage('humiMax', event.target.value)}
                                />
                            </Stack>
                        </div>
                        <div className='config-storage-popup-body-text-field'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DemoItem>
                                        <DatePicker label={t('config_storage_popup_effective_date')} format='DD-MM-YYYY' 
                                            className='config_storage_popup-date-picker'
                                            value={dayjs(storageInfor.effectiveDate)}
                                            onChange={(value) => handleChangeValueStorage('effectiveDate', dayjs(value).format('YYYY-MM-DD'))}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <Button variant="contained" fullWidth className='config-storage-popup-body-add-btn' onClick={handleClickConfirmButton}>{t('confirm_btn')}</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ConfigStorage;