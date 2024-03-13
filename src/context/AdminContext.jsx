import { useState, createContext } from 'react';

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
    const [openPopupAddFactory, setOpenPopupAddFactory] = useState(false)
    const [openPopupAddStorage, setOpenPopupAddStorage] = useState(false)
    const [openPopupConfigFactory, setOpenPopupConfigFactory] = useState(false)
    const [openPopupConfigStorage, setOpenPopupConfigStorage] = useState(false)
    const [openPopupDelete, setOpenPopupDelete] = useState(false)
    const [refreshDataTable, setRefreshDataTable] = useState(false)

    const value = {
        openPopupAddFactory, setOpenPopupAddFactory,
        openPopupAddStorage, setOpenPopupAddStorage,
        openPopupConfigFactory, setOpenPopupConfigFactory,
        openPopupConfigStorage, setOpenPopupConfigStorage,
        openPopupDelete, setOpenPopupDelete,
        refreshDataTable, setRefreshDataTable
    }
    
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export { AdminContext, AdminProvider }