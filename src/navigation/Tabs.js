import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

import BasicInfoScreen from '../screens/BasicInfoScreen';

const Tabs = [
    {
        key: "BasicInfo",
        name: "Overview",
        icon: <ListAltOutlinedIcon/>,
        screen: BasicInfoScreen
    }
];

export default Tabs;