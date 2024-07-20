import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { toast } from 'react-toastify';




import CustomBackdrop from "./CustomBackdrop";
import CustomerInformation from "./CustomerInformation";
import CustomerPhones from "./CustomerPhones";
import ContactCalifications from "./ContactCalifications";
import SurveyProduct1 from "./SurveyProduct1";
import SelectProduct from "./SelectProduct";
import PhoneContact from "./PhoneContact";


const style = {
  width: "100%",
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "1px ",
  boxShadow: 1,
  p: 2,
  m: 1,
};


export default function GetRegister({ surveyAct, setSurveyAct,setSelectedElement }) {
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading component 
  const [formContact, setFormContact] = useState(true); // show or hide contact form
  
  const [customerData, setCustomerData] = useState([]); //Customer information
  const [product, setProduct] = useState(0); // Product to sell  
  const [phoneSelected, setPhoneSelected] = useState(0); //Phone contact selected
  const [phone, setPhone] = useState(""); // phone to contact
  const [formComplete, setFormComplete] = useState(false); // when selected a product to sell this change to true and shor contact form
  const [newSurvey, setNewSurvey] = useState(false); //this call a new survey 

  
  useEffect(() => {
    const getRegister = async () => {
      const url = "https://localhost:4001/apiCrm/getRegister";
      try {
        const rsp = await axios.post(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(rsp.data[0].Customer.REGISTER);
        setCustomerData(rsp.data[0].Customer);
        setSurveyAct(1)
        setOpenBackdrop(false);
      } catch (error) {
        console.log(error);
        setOpenBackdrop(false);
      }
    };


    const getSpecificRegister = async () => {
      const url = "https://localhost:4001/apiCrm/getRegister";
      const params = {
        survey: surveyAct        
      }
      try {
        const rsp = await axios.post(url,params, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(rsp.data[1].contactQual);
        setCustomerData(rsp.data[0].Customer);
        setSurveyAct(1)
        setOpenBackdrop(false);
      } catch (error) {
        console.log(error);
        setOpenBackdrop(false);
      }

    }



    surveyAct == '' ? getRegister() : getSpecificRegister()

  }, [newSurvey]);

  const handleProduct = (event) => {
    setProduct(event.target.value);
  };
  const handlePhoneCall = (phoneValue) => {
    setPhone(phoneValue);
    
  };

  const validateFields = () => {
    const validations = [
      { condition: product === 0, message: "Selecciona un producto para continuar" },
      { condition: phoneSelected === 0, message: "Califica un teléfono para continuar" },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        toast.warning(validation.message);
        return false;
      }
    }

    return true;
  };


  const handleContact = () => {
    console.clear();
    if (validateFields()) {
      setFormContact(false);
      setFormComplete(true);
    }
  };  

  const handleLeaveContact = () => {
    console.clear();
    setSurveyAct(0)
    setSelectedElement(null)
    // setNewSurvey(prev => !prev);
    
  };

  const handleReturnContact = () => {
    setFormContact(true);
  };

  return (
    <>
      <CustomBackdrop open={openBackdrop} text={'Obteniendo registro, espera un poco...'} />
      <Box
        component="section"
        sx={style}
        style={{ display: formContact ? "block" : "none" }}
      >
        <Grid container spacing={2}>
          <Grid lg={12} md={12} xs={12} >
            <CustomerInformation data={customerData} /> {/* Aqui se cargan los datos del cliente como componente */}
          </Grid>
          <Grid lg={12} md={12} xs={12}>
            <CustomerPhones data={customerData} handlePhoneCall={handlePhoneCall} setPhoneSelected={setPhoneSelected} />  {/* Aqui se cargan los telefonos como componente */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid lg={12} md={12} xs={12} >
            <SelectProduct product={product} handleContact={handleContact} handleProduct={handleProduct} phoneSelected={phoneSelected} handleLeaveContact={handleLeaveContact} /> {/* Este componente es para cargar los productos a vender */}
          </Grid>

        </Grid>

      </Box>
      {/* --------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Esta caja es para cargar el producto */}
      <Box
        component="section"
        sx={style}
        style={{ display: formContact ? "none" : "block" }}
      >
        <Grid container spacing={2}>
          <Grid lg={12} md={12} xs={12}>
            <ContactCalifications
              handleReturnContact={handleReturnContact}
            />
          </Grid>
          <Grid lg={6} md={12} xs={12}>
            <CustomerInformation data={customerData} />  {/* Componente para cargar informacion del cliente */}
          </Grid>
          <Grid lg={6} md={12} xs={12}>
            <PhoneContact phone={phone} />

          </Grid>
          <Grid lg={12} md={12} xs={12}>
            {formComplete && <SurveyProduct1 product={product} />}
          </Grid>
        </Grid>
      </Box>



    </>
  );
}




