import { Box, Button, Typography, TextField, Stack } from "@mui/joy";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { Link, SubmitFunction, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";

function validate(data: string|undefined, name: string){
    if (!data) {
        return name+" is required";
    } else if (typeof data !== "string" || data.length < 0) {
        return name+` must not be empty`;
    }
}

export async function action({ request }: ActionArgs) {
    const context = await getGrpcContext(request);

    const form = await request.formData();
    const ownerId = context.userId;
    const name = form.get('name')?.toString();
    const trackingNumber = form.get('trackingNumber')?.toString();
    const transportCompany = form.get('transportCompany')?.toString();
    const sender = form.get('sender')?.toString();

    const errors = {
        name: validate(name, "Parcel name"),
        trackingNumber: validate(trackingNumber, "Tracking Number"),
        transportCompany: validate(transportCompany, "Transport Company"),
        sender: validate(sender, "Sender"),
    };

    if (ownerId && name && trackingNumber && transportCompany && sender &&
        name !=="" && trackingNumber !=="" && transportCompany !=="" && sender !=="") {
        const data = { ownerId, name, transportCompany, trackingNumber, sender };
        await parcelServiceClient.createParcel({ context, data })
        return redirect(`/parcels`);
    }

    return {errors}
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
            <NewParcelView submit={submit} />
        </>
    );
}

function NewParcelView({ submit }: { submit: SubmitFunction }) {
    const [name, setName] = useState<string>("");
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [transportCompany, setTransportCompany] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const actionData = useActionData();

    return (
        <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
            <TextField
                label="Parcel Name"
                placeholder={actionData?.errors?.name ? actionData?.errors?.name:"iPhone 14 Pro Max"}
                color={actionData?.errors?.name ? "warning":"neutral"}
                variant= "outlined"
                value={name}
                onChange={(newValue) => { setName(newValue.target.value) }}
            />
            <TextField
                label="Tracking Number"
                placeholder={actionData?.errors?.trackingNumber ? actionData?.errors?.trackingNumber:"AB01234567890"}
                color={actionData?.errors?.trackingNumber ? "warning":"neutral"}
                variant="outlined"
                value={trackingNumber}
                onChange={(newValue) => { setTrackingNumber(newValue.target.value) }}
            />
            <TextField
                label="Transport Company"
                placeholder={actionData?.errors?.transportCompany ? actionData?.errors?.transportCompany:"The Flash"}
                color={actionData?.errors?.transportCompany ? "warning":"neutral"}
                variant="outlined"
                value={transportCompany}
                onChange={(newValue) => { setTransportCompany(newValue.target.value) }}
            />
            <TextField
                label="Sender"
                placeholder={actionData?.errors?.sender ? actionData?.errors?.sender:"Anos Positos"}
                color={actionData?.errors?.sender ? "warning":"neutral"}
                variant="outlined"
                value={sender}
                onChange={(newValue) => { setSender(newValue.target.value) }}
            />
            <Box textAlign='center'>
                <Button
                    color="info"
                    size="sm"
                    sx={{ mr: 2, width: 300 }}
                    onClick={() => {
                        submit({ name, transportCompany, trackingNumber, sender }, { method: "post" })
                    }}
                >
                    <FiSave style={{ marginRight: 2 }} />
                    <Typography>Save</Typography>
                </Button>
            </Box>
        </Stack>
    );
}

