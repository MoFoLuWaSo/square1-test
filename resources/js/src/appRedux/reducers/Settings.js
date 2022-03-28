
const initialSettings = {


    isDirectionRTL: false,
    locale: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us'
    }
};


const SettingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case 'SWITCH_LANGUAGE':
            return {
                ...state,
                locale: action.payload,

            };
        default:
            return state;
    }
}

export default SettingsReducer;
