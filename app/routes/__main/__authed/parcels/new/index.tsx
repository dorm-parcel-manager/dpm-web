import { Box, Button, Typography, TextField, Stack } from "@mui/joy";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import type { Context } from "~/proto/common";
import { parcelServiceClient } from "~/client";


export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  return context
}

export default function Parcels() {
    const context = useLoaderData<Context>();
    return (
        <div>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Button
                key={1}
                component={Link}
                to="/parcels"
                color="primary"
                size="sm"
                sx={{ mr: 2 }}
                startDecorator={<AiFillCaretLeft />}
            />
            <Typography level="h4">New Parcel</Typography>
        </Box>
        <NewParcelView context={context}/>
        <Button
            onClick={()=>{console.log("Clicked")}}
        />
        </div>
    );
}

async function CreateParcel( 
    context: Context,
    name: string, 
    trackingNumber:string, 
    transportCompany:string, 
    sender:string){
    console.log("Created")
    const ownerId = context.userId;
    const data = {ownerId, name, transportCompany, trackingNumber, sender};
    const response = await parcelServiceClient.createParcel({ context, data }).response;
    console.log(response)
    return response
}

function NewParcelView(context : {context : Context}) {
    const [name, setName] = useState<string>("");
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [transportCompany, setTransportCompany] = useState<string>("");
    const [sender, setSender] = useState<string>("");

    return (
        <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
            <TextField
                label = "Parcel Name"
                placeholder = "iPhone 14 Pro Max"
                variant="outlined"
                onChange={(newValue) => {setName(newValue.target.value)}}
            />
            <TextField
                label = "Tracking Number"
                placeholder = "AB01234567890"
                variant="outlined"
                onChange={(newValue) => {setTrackingNumber(newValue.target.value)}}
            />
            <TextField
                label = "Transport Company"
                placeholder = "The Flash"
                variant="outlined"
                onChange={(newValue) => {setTransportCompany(newValue.target.value)}}
            />
            <TextField
                label = "Sender"
                placeholder = "Anos Positos"
                variant="outlined"
                onChange={(newValue) => {console.log(newValue);setSender(newValue.target.value)}}
            />
            <Box textAlign='center'>
                <Button
                    key={2}
                    color="info"
                    size="sm"
                    sx={{ mr: 2, width: 300}} 
                    onClick={async () => {console.log("Pressed"); await CreateParcel(context.context, name, trackingNumber, transportCompany, sender)}}
                >
                    <FiSave style={{ marginRight: 2 }}/>
                    <Typography>Save</Typography>
                </Button>
            </Box>
        </Stack>
    );
}
