const express = require("express")
const fs = require("fs")
const path = require("path");

const data = [
    {
        id:"1",
        numberOfSeats:100,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:1000,
        ifBooked:"Booked",
        customerName:"sameera",
        date:"27-07-2023",
        startTime:"01-August-2023 at 12am",
        endTime:"02-August-2023 at 12pm",
        RoomeId:201,
        RoomName:"Duplex"
    },
    {
        id:"2",
        numberOfSeats:50,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:"",
        ifBooked:"vacant",
        customerName:"",
        date:"",
        startTime:"",
        endTime:"",
        RoomeId:202,
        RoomName:"Duplex"
    },
    {
        id:"3",
        numberOfSeats:20,
        amenities:["AC","chairs","discolights","internetAccess"],
        priceForAnHour:2000,
        ifBooked:"Booked",
        customerName:"gowtham",
        date:"27-07-2023",
        startTime:"01-August-2023 at 12am",
        endTime:"02-August-2023 at 12pm",
        RoomeId:201,
        RoomName:"suite"
    },
    {
        id:"4",
        numberOfSeats:50,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:"",
        ifBooked:"vacant",
        customerName:"",
        date:"",
        startTime:"",
        endTime:"",
        RoomeId:202,
        RoomName:"Duplex"
    },
    {
        id:"5",
        numberOfSeats:20,
        amenities:["AC","chairs","discolights","internetAccess"],
        priceForAnHour:2500,
        ifBooked:"Booked",
        customerName:"gowtham",
        date:"27-07-2022",
        startTime:"01-August-2023 at 12am",
        endTime:"02-August-2023 at 12pm",
        RoomeId:201,
        RoomName:"Duplex"
    },
]

const app = express()

app.use(express.json())

app.get("/", function (req, res) {
    res.send(data);
  });

//get hall details

app.get("/hall/details",(req,res)=>{
       
    if(req.query){
    const {ifBooked}=req.query;
    //url query 
    console.log(ifBooked)

    let filterdHall = data;
    if(ifBooked){
        filterdHall =  filterdHall.filter((halls)=>halls.ifBooked===ifBooked)

    }
    res.send(filterdHall)
}else{
    res.send(data)   
}
})

app.get("/hall/details/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id)
    const specificHall =data.find(hall=>hall.id===id)

    res.send(specificHall)
})

//new hall

//1.creating a room

app.post("/hall/details/",(req,res)=>{
    const newHall ={
        id:data.length+1,
        numberOfSeats:req.body.numberOfSeats,
        amenities:req.body.amenities,
        priceForAnHour:req.body.priceForAnHour,
        RoomId:req.body.RoomId,
        customerName:req.body.customerName,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        RoomName:req.body.RoomName,

    }
    console.log(req.body);
    data.push(newHall);
    res.send(data);
 })

 //2.Booking a Room

 app.put("/hall/details/:id",(req,res)=>{
    const {id}= req.params;
    const halls = data.find(hall=>hall.id===id);
    if(halls.ifBooked==="Booked"){
        res.status(400).send("Hey the hall is already booked")
    }else{
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    halls.customerName = req.body.customerName;
    halls.ifBooked="Booked"
    res.status(200).send(data)
    }
 })

 //3.List all rooms with booked data

 app.get("/booked/halls",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.ifBooked==="Booked"){
                return{
                    "RoomName":room.RoomName,
                    "ifBooked":room.ifBooked,
                    "customerName":room.customerName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                return{"RoomName":room.RoomName, "ifBooked":"vacant"}
            }
        })
    )
 })

 //4.List all customers with booked data

 app.get("/customer/details",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.ifBooked==="Booked"){
                return{
                    "customerName":room.customerName,
                    "RoomName":room.RoomName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                
                return{"RoomName":room.RoomName, "ifBooked":"vacant"}
            }
        })
    )
 })



app.listen(9000, ()=>console.log(`server started in localhost:9000`))