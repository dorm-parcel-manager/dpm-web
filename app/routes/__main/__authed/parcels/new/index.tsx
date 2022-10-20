import { Box, Button, Typography, TextField, Stack } from "@mui/joy";
import { ActionArgs, redirect } from "@remix-run/node";
import { Link, SubmitFunction, useNavigate, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";



export async function action({ request }: ActionArgs) : Promise<boolean> {
    const context = await getGrpcContext(request);

    const form = await request.formData();
    const ownerId = context.userId;
    const name = form.get('name')?.toString();
    const trackingNumber = form.get('trackingNumber')?.toString();
    const transportCompany = form.get('transportCompany')?.toString();
    const sender = form.get('sender')?.toString();
    if(name && trackingNumber && transportCompany && sender){
        const data = {ownerId, name, transportCompany, trackingNumber, sender};
        const { response, status } = await parcelServiceClient.createParcel({ context, data })
        return true
    }
    return false
}

export default function Parcels() {
    const submit = useSubmit();
    return (
        <>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Button
                component={Link}
                to="/parcels"
                color="primary"
                size="sm"
                sx={{ mr: 2 }}
                startDecorator={<AiFillCaretLeft />}
            />
            <Typography level="h4">New Parcel</Typography>
        </Box>
        <NewParcelView submit={submit}/>
        </>
    );
}

function NewParcelView({submit} : {submit : SubmitFunction}) {
    const [name, setName] = useState<string>("");
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [transportCompany, setTransportCompany] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [link, setLink] = useState<boolean>(false);

    return (
        <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
            <TextField
                label = "Parcel Name"
                placeholder = "iPhone 14 Pro Max"
                variant="outlined"
                value={name}
                onChange={(newValue) => {setName(newValue.target.value)}}
            />
            <TextField
                label = "Tracking Number"
                placeholder = "AB01234567890"
                variant="outlined"
                value={trackingNumber}
                onChange={(newValue) => {setTrackingNumber(newValue.target.value)}}
            />
            <TextField
                label = "Transport Company"
                placeholder = "The Flash"
                variant="outlined"
                value={transportCompany}
                onChange={(newValue) => {setTransportCompany(newValue.target.value)}}
            />
            <TextField
                label = "Sender"
                placeholder = "Anos Positos"
                variant="outlined"
                value={sender}
                onChange={(newValue) => {setSender(newValue.target.value)}}
            />
            <Box textAlign='center'>
                <Button
                    component={Link}
                    to="/parcels"
                    color="info"
                    size="sm"
                    sx={{ mr: 2, width: 300}} 
                    onClick={() => {
                        submit({ name, transportCompany, trackingNumber, sender }, { method: "post" })
                    }}
                >
                    <FiSave style={{ marginRight: 2 }}/>
                    <Typography>Save</Typography>
                </Button>
            </Box>
        </Stack>
    );
}

