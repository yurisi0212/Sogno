import Authenticated from "@/Layouts/Authenticated";

export default function Index(props: any) {
    return(
        <>
            <Authenticated auth={props.auth} header="search" flash={props.flash}>
                <div>
                    search
                </div>
            </Authenticated>
        </>
    );
}
