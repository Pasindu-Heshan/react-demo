import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

const axios = require('axios').default;

class Home extends Component {

    state = {
        details: [],
        currentPage:0,
        currentData:[],
        isShow: false,
        selectCardDetail:null,
        nextStatus: false,
        prevStatus: true
    }

    fetchDetails = async () => {
        let detailsData;
        await axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(async function (response) {
                // handle success
                let temp = []
                for (let i = 0; i < 60; i++) {
                    temp.push(response.data[i])
                    temp[i].customID = (response.data[i].id)*10
                }
                detailsData = temp
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        this.setState({details: detailsData})


    }

    async componentDidMount() {
        await this.fetchDetails()
        await this.dataHandler()
    }

    dataHandler = () =>{
        let detailData = this.state.details.slice(0,20)
        this.setState({currentData:detailData})

    }
    nextPageHandler = () =>{
        if(this.state.currentData.length<=20){
            let detailData = this.state.details.slice(0,40)
            this.setState({prevStatus: false})
            this.setState({currentData:detailData})
        }
        else if(this.state.currentData.length<=40){
            let detailData = this.state.details.slice(0,60)
            this.setState({currentData:detailData})
            this.setState({prevStatus: false})
            this.setState({nextStatus:true})
        }
    }

    prevPageHandler = () =>{
        if(this.state.currentData.length === 60){
            let detailData = this.state.details.slice(0,40)
            this.setState({currentData:detailData})
        }
        else if(this.state.currentData.length === 40){
            let detailData = this.state.details.slice(0,20)
            this.setState({currentData:detailData})
            this.setState({prevStatus:true})
            this.setState({nextStatus:false})
        }
    }

    cardClickHandler =async (detail) => {
        await this.setState({isShow: true,selectCardDetail: detail})
    }




    render() {
        let cardDetails = this.state.details
        return (
            cardDetails ?
                <div className="container" style={{marginTop:"150px"}}>

                    {this.state.selectCardDetail !== null ? <Modal isOpen={this.state.isShow}
                            toggle={() => this.setState({isShow: !this.state.isShow})}
                    >
                        <ModalHeader toggle={() => this.setState({isShow: !this.state.isShow})}>
                            {this.state.selectCardDetail.id}
                        </ModalHeader>
                        <ModalBody>
                            {this.state.selectCardDetail.title}
                        </ModalBody>
                    </Modal> : null}


                    <div className="row">
                        {this.state.currentData.map((detail,index)=>
                            <div key={index} className="col-md-3" onClick={()=>this.cardClickHandler(detail)}>
                                <Card>
                                    <Card.Img variant="top" src={detail.thumbnailUrl} />
                                    <Card.Body>
                                        <Card.Title>{detail.title}</Card.Title>
                                        <p>{detail.id}</p>
                                        <p>{detail.customID}</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <button disabled={this.state.prevStatus} className="btn btn-primary" onClick={this.prevPageHandler} >previous</button>
                            <button disabled={this.state.nextStatus} className="btn btn-primary" onClick={this.nextPageHandler}>next</button>
                        </div>


                    </div>
                </div> : null
        );
    }
}

export default Home;