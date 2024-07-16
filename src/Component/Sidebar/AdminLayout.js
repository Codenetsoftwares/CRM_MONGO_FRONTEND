import React,{useState, useEffect} from 'react'
import TopNavbar from './TopNavbar'
import NavSide from './NavSide'
import Layout from './Layout'

const AdminLayout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // Callback function to update selected menu item
    const handleMenuItemSelect = (menuItem) => {
      console.log('from adminlayout onclick',menuItem)
      setSelectedMenuItem(menuItem);
       // Store the selected menu item in local storage
       localStorage.setItem('selectedMenuItem', menuItem);

    };

    useEffect(() => {
      // Retrieve the selected menu item from local storage on component mount
      const storedMenuItem = localStorage.getItem('selectedMenuItem');
      if (storedMenuItem) {
        setSelectedMenuItem(storedMenuItem);
      }
    }, []);
  return (
    <div >
      <TopNavbar  selectedMenuItem={selectedMenuItem}/>
      <NavSide onSelect={handleMenuItemSelect}/>
      <Layout/>
    </div>
  )
}

export default AdminLayout 
