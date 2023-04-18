import { useState } from "react";
import { Link } from "react-router-dom";

function DateFilter(props){
    console.log(props)
    const [launches, setLaunches] = useState(props.myprops);

    return(
        <>
        <div class="container py-3">
    <div class="row text-center text-white">
    <div class="col-lg-7 mx-auto">
            <h5 class="display-7">{launches?.length} Item found</h5>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-8 mx-auto">
            
            <ul class="list-group shadow">
                {launches?.map((item,index)=>
                <li class="list-group-item">
                    
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2">{item?.mission_name} - {item?.launch_year}</h5>
                        <p class="font-italic text-muted mb-0 small">{item?.launch_site?.site_name_long} | {item?.rocket?.rocket_name} | {item?.launch_site?.site_name_long}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">{item?.launch_date_local.slice(0,10)}</h6>
                        </div>
                    </div><img src={item?.links?.mission_patch_small} alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2"/>
                </div>
            </li>
                )}
            </ul>
        </div>
    </div>
</div>
        </>
    )
}
export default DateFilter;

export async function getServerSideProps(context){
    const date = context.query;
    console.log(date)
    let data = await fetch(`https://api.spacexdata.com/v3/launches?start=${date.start}&end=${date.end}`);
  let myprops = await data.json();

  return {
    props: { myprops },
  };
}