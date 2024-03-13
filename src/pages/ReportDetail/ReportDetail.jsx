import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Header, MenuTab, ReportDetailMain, Footer, AboutUs, MenuTabMobile } from '../../components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/AppContext';
import './ReportDetail.scss'

const ReportDetail = () => {
    const appContext = useContext(AppContext)
    const { t } = useTranslation('translation')

    const [showAboutUs, setShowAboutUs] = useState(false)

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1050 && !appContext.openMenuTabMobile) {
            appContext.setShowButtonAboutUs(false)
        } else {
            appContext.setShowButtonAboutUs(true)
        }
    })

    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}>
                <Header isAuthen={true} />
                <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                    <MenuTab />
                    <Box component="main" sx={{ backgroundColor: '#f1f1f1', flexGrow: 1 }}>
                        <ReportDetailMain />
                    </Box>
                </Box>
                <div>
                    <div className='report-detail-about-container' style={{display: appContext.showButtonAbousUs ? 'block' : 'none'}} onClick={() => setShowAboutUs(true)}>
                        <InfoOutlinedIcon sx={{color: '#074E9F'}}/>
                        <span className='report-detail-about-title'>{t('about')}</span>
                    </div>
                </div>
                <Footer />
            </Box>
            <AboutUs showAboutUs={showAboutUs} setShowAboutUs={setShowAboutUs}/>
            <MenuTabMobile />
        </ThemeProvider>
    )
}

export default ReportDetail