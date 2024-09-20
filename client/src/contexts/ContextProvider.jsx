import React, {
    createContext, useContext,
    useState
} from "react";

const StateContext = createContext();

const iniitialState = {
    email: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [showComponents, setShowComponents] = useState(false)
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(iniitialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#86ACBB');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showUserProfileModal, setShowUserProfileModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [role, setRole] = useState("");
    
    const handleOnClose = () => {setShowEmailModal(false), setShowUserProfileModal(false)};
    
    const handleOnCloseConfirm = () =>{ setShowLogoutModal(false)}

    const setMode = (e) => {
        setCurrentMode(e.target.value);

        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false);
    }

    const setColor = (color) => {
        setCurrentColor(color);

        localStorage.setItem('colorMode', color);
    }

    const handleClick = (clicked) => {
        setIsClicked({ ...iniitialState, [clicked]: true });
        setThemeSettings(false);
    }



    return (
        <StateContext.Provider
            value={{
                showComponents,
                setShowComponents,
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                currentMode,
                themeSettings,
                setThemeSettings,
                setCurrentColor,
                setCurrentMode,
                setColor,
                setMode,
                showEmailModal,
                setShowEmailModal,
                handleOnClose,
                showUserProfileModal,
                setShowUserProfileModal,
                showLogoutModal,
                setShowLogoutModal,
                handleOnCloseConfirm,
                role,
                setRole

            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);