import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminContext } from '../../../context/AdminContext';
import API from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './ConfigFactory.scss';

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

const ConfigFactory = (props) => {
    const { plantConfig } = props
    const context = useContext(AdminContext)
    const { t } = useTranslation('translation')

    const [plantInfor, setPlantInfor] = useState({
        plantCode: plantConfig?.plantCode || '',
        plantName: plantConfig?.plantName || '',
        address: plantConfig?.address || '',
        status: plantConfig?.status ? (plantConfig?.status === 'Active' ? 1 : 0) : ''
    })
    const [confirm, setConfirm] = useState(false)

    const handleClose = () => context.setOpenPopupConfigFactory(false)

    const handleChangeValuePlant = (paramName, value) => {
        setPlantInfor(prev => ({...prev, [paramName]: value}))
    }

    const handleClickConfirmButton = () => {
        setConfirm(true)
    }

    useEffect(() => {
        setPlantInfor({
            plantCode: plantConfig?.plantCode || '',
            plantName: plantConfig?.plantName || '',
            address: plantConfig?.address || '',
            status: plantConfig?.status ? (plantConfig?.status === 'Active' ? 1 : 0) : ''
        })
    }, [plantConfig])

    useEffect(() => {
        if (confirm) {
            const postData = async () => {
                initToast(ToastId.ConfigPlant)
                try {
                    const resultApi = await API.adminService.configPlant(plantInfor)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setOpenPopupConfigFactory(false)
                        context.setRefreshDataTable(prev => !prev)
                        toast.update(ToastId.ConfigPlant, { 
                            render: "Cấu hình Plant thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.ConfigPlant, { 
                            render: resultApi.data.message || "Cấu hình Plant thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreatePlant, { 
                        render: err.response.data.message || "Cấu hình Plant thất bại", 
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
                open={context.openPopupConfigFactory} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='config-factory-popup'
            >
                <Box sx={modalStyle}>
                    <div className='config-factory-popup-header'>
                        <div className='config-factory-popup-header-title'>{t('config_factory_popup_title')}</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='config-factory-popup-body'>
                        <div className='config-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_code')} disabled
                                placeholder={t('add_new_factory_popup_factory_code_placeholder')} fullWidth 
                                value={plantInfor.plantCode} onChange={(event) => handleChangeValuePlant('plantCode', event.target.value)}
                            />
                        </div>
                        <div className='config-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_name')}
                                placeholder={t('add_new_factory_popup_factory_name_placeholder')} fullWidth
                                value={plantInfor.plantName} onChange={(event) => handleChangeValuePlant('plantName', event.target.value)}
                            />
                        </div>
                        <div className='config-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_address')} multiline rows={4}
                                placeholder={t('add_new_factory_popup_factory_address_placeholder')} fullWidth
                                value={plantInfor.address} onChange={(event) => handleChangeValuePlant('address', event.target.value)}
                            />
                        </div>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel>{t('popup_dropdown_status')}</InputLabel>
                                <Select label={t('popup_dropdown_status')} value={plantInfor.status} onChange={(event) => handleChangeValuePlant('status', event.target.value)}>
                                    <MenuItem value={1}>{t('popup_dropdown_status_active')}</MenuItem>
                                    <MenuItem value={0}>{t('popup_dropdown_status_no_active')}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button variant="contained" fullWidth className='config-factory-popup-body-confirm-btn'
                            onClick={handleClickConfirmButton}
                        >
                            {t('confirm_btn')}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ConfigFactory;