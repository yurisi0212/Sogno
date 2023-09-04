import Authenticated from "@/Layouts/Authenticated";
import {Card} from "@mui/material";

export default function Index(props: any) {
return (
  <>
    <Authenticated auth={props.auth} header="profile" flash={props.flash}>
        <div>
            <div className="mx-6 mt-10 text-center">
                <Card>
                </Card>
            </div>
        </div>
    </Authenticated>
  </>
);
}
