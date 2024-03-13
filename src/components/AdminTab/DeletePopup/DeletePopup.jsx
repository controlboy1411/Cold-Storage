import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AdminContext } from '../../../context/AdminContext';
import './DeletePopup.scss';

const DeletePopup = (props) => {
    const context = useContext(AdminContext)
    const { type, factory, storage} = props
    const closePopup = () => context.setOpenPopupDelete(false)
    const { t } = useTranslation('translation')

    const getConfirmText = () => {
        let text = ''
        if (type === 'factory') {
            if (factory && factory.name) {
                text = t('delete_popup_question') + ' <strong>' + factory.name + '</strong> ' + t('delete_popup_remove_factory') + '?'
            }
        } else {
            if (factory && factory.name && storage && storage.name) {
                text = t('delete_popup_question') + ' <strong>' + storage.name + '</strong> ' + t('delete_popup_remove_storage') + ' <strong>' + factory.name + '</strong>?'
            }          
        }
        return text
    }

    return (
        <div>
            <Modal show={context.openPopupDelete} centered onHide={closePopup}
                className='delete-popup-modal'
                backdropClassName='delete-poup-backdrop-modal'
            >
                <Modal.Header>
                    <Modal.Title as='h5' className='delete-popup-title'>{t('delete_popup_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body as='div'>
                    <div className='delete-popup-content' dangerouslySetInnerHTML={{__html: getConfirmText()}}></div>
                    <div className='d-flex flex-row justify-content-center'>
                        <Button variant="contained" fullWidth className='delete-popup-btn' onClick={closePopup}>{t('cancel_btn')}</Button>
                        <Button variant="contained" fullWidth className='delete-popup-btn'>{t('confirm_btn')}</Button>                     
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeletePopup;