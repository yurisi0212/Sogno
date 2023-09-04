import Authenticated from "@/Layouts/Authenticated";

export default function Index(props: any) {
    return(
      <>
        <Authenticated auth={props.auth} header="notification" flash={props.flash}>
            <div>
                notification
            </div>
        </Authenticated>
      </>
    );
}
