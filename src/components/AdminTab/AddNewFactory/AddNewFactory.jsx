import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../../context/AdminContext';
import API from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './AddNewFactory.scss';

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

const AddNewFactory = () => {
    const context = useContext(AdminContext)
    const handleClose = () => context.setOpenPopupAddFactory(false)
    const { t } = useTranslation('translation')

    const [plantInfor, setPlantInfor] = useState({
        baCode: '5096',
        plantCode: '',
        plantName: '',
        address: ''
    })
    const [confirm, setConfirm] = useState(false)

    const handleChangeValuePlant = (paramName, value) => {
        setPlantInfor(prev => ({...prev, [paramName]: value}))
    }

    const handleClickConfirmButton = () => {
        setConfirm(true)
    }

    useEffect(() => {
        if (confirm) {
            const postData = async () => {
                initToast(ToastId.CreatePlant)
                try {
                    const resultApi = await API.adminService.createPlant(plantInfor)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setOpenPopupAddFactory(false)
                        context.setRefreshDataTable(prev => !prev)
                        toast.update(ToastId.CreatePlant, { 
                            render: "Tạo Plant thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreatePlant, { 
                            render: resultApi.data.message || "Tạo Plant thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreatePlant, { 
                        render: err.response.data.message || "Tạo Plant thất bại", 
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
                open={context.openPopupAddFactory} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='add-new-factory-popup'
            >
                <Box sx={modalStyle}>
                    <div className='add-new-factory-popup-header'>
                        <div className='add-new-factory-popup-header-title'>{t('add_new_factory_popup_title')}</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='add-new-factory-popup-body'>
                        <div className='add-new-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_code')} 
                                placeholder={t('add_new_factory_popup_factory_code_placeholder')} fullWidth 
                                value={plantInfor.plantCode} onChange={(event) => handleChangeValuePlant('plantCode', event.target.value)}
                            />
                        </div>
                        <div className='add-new-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_name')}
                                placeholder={t('add_new_factory_popup_factory_name_placeholder')} fullWidth
                                value={plantInfor.plantName} onChange={(event) => handleChangeValuePlant('plantName', event.target.value)}
                            />
                        </div>
                        <div className='add-new-factory-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_address')}
                                placeholder={t('add_new_factory_popup_factory_address_placeholder')} fullWidth
                                value={plantInfor.address} onChange={(event) => handleChangeValuePlant('address', event.target.value)}
                            />
                        </div>
                        <Button variant="contained" fullWidth className='add-new-factory-popup-body-confirm-btn'
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

export default AddNewFactory;