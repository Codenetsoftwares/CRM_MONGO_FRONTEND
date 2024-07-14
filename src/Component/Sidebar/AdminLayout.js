import React,{useState} from 'react'
import TopNavbar from './TopNavbar'
import NavSide from './NavSide'
import Layout from './Layout'

const AdminLayout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // Callback function to update selected menu item
    const handleMenuItemSelect = (menuItem) => {
      console.log('from adminlayout onclick',menuItem)
      setSelectedMenuItem(menuItem);
    };
  return (
    <div >
      <TopNavbar  selectedMenuItem={selectedMenuItem}/>
      <NavSide onSelect={handleMenuItemSelect}/>
      <Layout/>
    </div>
  )
}

export default AdminLayout 
