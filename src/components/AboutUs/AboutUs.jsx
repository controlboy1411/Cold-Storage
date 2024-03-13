import Modal from 'react-bootstrap/Modal';
import logoHeader from '../../assets/logo_header.jpg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './AboutUs.scss';

const AboutUs = (props) => {
    const { showAboutUs, setShowAboutUs } = props
    const [centerPopup, setCenterPopup] = useState(window.innerWidth <= 600 ? true : false)
    const { t } = useTranslation('translation')

    window.addEventListener('resize', () => {
        setCenterPopup(window.innerWidth <= 600 ? true : false)
    })

    return (
        <Modal animation className='aboutus-modal' backdropClassName='aboutus-custom-backdrop-modal' 
            centered={centerPopup} show={showAboutUs} onHide={() => setShowAboutUs(false)}
        >
            <Modal.Header closeButton className='aboutus-modal-header'>{t('about')}</Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-row align-items-center aboutus-body-container'>
                    <img src={logoHeader} alt="logo" className='aboutus-body-container-1-img'/>
                    <div className='d-flex flex-column '>
                        <div className='aboutus-body-container-1-title-name'>{t('about_company')}</div>
                        <div className='aboutus-body-container-1-title-copyright'>{t('about_copyright')}</div>
                    </div>
                </div>
                <div className='aboutus-body-container'>
                    <table>
                        <tr>
                            <td>{t('about_application')}</td>
                            <td className='aboutus-body-container-table-row-value'>{t('about_application_name')}</td>
                        </tr>
                        <tr>
                            <td>{t('about_version')}</td>
                            <td className='aboutus-body-container-table-row-value'>1.0.0</td>
                        </tr>
                        <tr>
                            <td>{t('about_support')}</td>
                            <td className='aboutus-body-container-table-row-value'>iservice.cp.com.vn</td>
                        </tr>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AboutUs;