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
import './AddNewStorage.scss';


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

const AddNewStorage = (props) => {
    const { plantConfig } = props
    const context = useContext(AdminContext)
    const { t } = useTranslation('translation')

    const [storageInfor, setStorageInfor] = useState({
        baCode: '5096',
        plantCode: plantConfig?.plantCode || '',
        plantName: plantConfig?.plantName || '',
        storageName: ''
    })
    const [confirm, setConfirm] = useState(false)

    const handleChangeValueStorage = (paramName, value) => {
        setStorageInfor(prev => ({...prev, [paramName]: value}))
    }

    const handleClose = () => context.setOpenPopupAddStorage(false)

    const handleClickConfirmButton = () => {
        setConfirm(true)
    }

    useEffect(() => {
        setStorageInfor({
            baCode: '5096',
            plantCode: plantConfig?.plantCode || '',
            plantName: plantConfig?.plantName || '',
            storageName: ''
        })
    }, [plantConfig])

    useEffect(() => {
        if (confirm) {
            const postData = async () => {
                initToast(ToastId.CreateStorage)
                try {
                    const resultApi = await API.adminService.createStorage({ baCode: storageInfor.baCode, plantCode: storageInfor.plantCode, storageName: storageInfor.storageName})
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setOpenPopupAddStorage(false)
                        context.setRefreshDataTable(prev => !prev)
                        toast.update(ToastId.CreateStorage, { 
                            render: "Tạo Storage thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreateStorage, { 
                            render: resultApi.data.message || "Tạo Storage thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreateStorage, { 
                        render: err.response.data.message || "Tạo Storage thất bại", 
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
                open={context.openPopupAddStorage} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='add-new-storage-popup'
            >
                <Box sx={modalStyle}>
                    <div className='add-new-storage-popup-header'>
                        <div className='add-new-storage-popup-header-title'>{t('add_new_storage_popup_title')}</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='add-new-storage-popup-body'>
                        <div className='add-new-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_code')}
                                placeholder={t('add_new_factory_popup_factory_code_placeholder')} fullWidth disabled
                                value={storageInfor.plantCode}
                            />
                        </div>
                        <div className='add-new-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_factory_popup_factory_name')}
                                placeholder={t('add_new_factory_popup_factory_name_placeholder')} fullWidth disabled
                                value={storageInfor.plantName}
                            />
                        </div>
                        <div className='add-new-storage-popup-body-text-field'>
                            <TextField  variant="outlined" label={t('add_new_storage_popup_storage_name')} 
                                placeholder={t('add_new_storage_popup_storage_name_placeholder')} fullWidth
                                value={storageInfor.storageName} onChange={(event) => handleChangeValueStorage('storageName', event.target.value)}
                            />
                        </div>
                        <Button variant="contained" fullWidth className='add-new-storage-popup-body-add-btn'
                            onClick={handleClickConfirmButton}
                        >
                            {t('add_btn')}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AddNewStorage;