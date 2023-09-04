import Authenticated from "@/Layouts/Authenticated";

export default function Show(props: any) {
    return (
      <>
      <Authenticated auth={props.auth} header="dream" flash={props.flash}>
          <div>
          </div>
      </Authenticated>
      </>
    );
}
