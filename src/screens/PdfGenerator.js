import React from 'react';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function PdfGenerator() {

    const { uname } = useParams()
    const { rname } = useParams()
    const { fdate } = useParams()
    const { tdate } = useParams()
    const { tdays } = useParams()
    const { tamount } = useParams()
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }
    const Printinfo = () => (
        <div>
            <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                    <p>Name:{uname}</p>
               
                    <p>Room:{rname}</p>
                    <p>Check In:{fdate}</p>
                    <p>Check Out:{tdate} </p>
                    <p>Total Days:{tdays}</p>
                    <p>Total Amount:{tamount}</p>

                </b>
            </div >
        </div>
    )
    const MyDocument = () => (
        <Document>
            <Page>
                <Text>*******************************************************************************************************</Text>
                <Text style={{fontSize:'20px',textAlign:'center',color:'blue'}}>Booking Details</Text>
                <br></br>
                <Text >Name:{uname}</Text>
                <Text >Room:{rname}</Text>
                <Text >Check In:{fdate}</Text>
                <Text >Check Out:{tdate}</Text>
                <Text >Total Days:{tdays}</Text>
                <Text >Total Amount:{tamount}</Text>
                <Text><center>Thank you !</center></Text>
                <Text>*******************************************************************************************************</Text>
                <Text>*******************************************************************************************************</Text>

            </Page>
        </Document>
    );
    return (
        <div>
            
            <div class="reviewform" style={{margin:'200px',marginTop:'30px'}}>
            <label style={{paddingLeft:'37%',fontSize:'35px',color:'orange'}}>Booking Info</label>  
            <hr></hr>
            <br/> 
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Name:{uname}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Room:{rname}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Check-In:{fdate}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Check-Out:{tdate}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Total Days:{tdays}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Total Amount:{tamount}</label> 
            <br/>
            <label style={{paddingLeft:'20%',fontSize:'20px'}}>Payment:Successful</label> 
            <br/>


            <PDFDownloadLink document={<MyDocument />} fileName="my_document.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Generating PDF...' :<button className='btn btn-primary' style={{marginLeft:'28%'}}>Download PDF</button>
                }
            </PDFDownloadLink>
            </div>
        </div>
    )
};

export default PdfGenerator;
