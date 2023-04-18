import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from 'next/router'

function SingleLaunch(props) {
  console.log(props)
  const [launch, setLaunch] = useState(props.myprops)

    // useEffect(()=>{
    //     axios.get("https://api.spacexdata.com/v3/launches/67").then((res)=>{
    //         console.log(res,'res')
    //     })
    // },[])
  return (
    <>
      <div class="container">
        <br />{" "}
        <div class="card">
          <div class="row">
            <aside class="col-sm-5 border-right">
              <article class="gallery-wrap">
                <div class="img-big-wrap">
                  <div>
                    {" "}
                    <a href="#">
                      <img src={launch?.links?.mission_patch_small} />
                    </a>
                  </div>
                </div>
              </article>
            </aside>
            <aside class="col-sm-7">
              <article class="card-body p-5">
                <h3 class="title mb-3">
                  {launch?.mission_name}
                </h3>

                <p class="price-detail-wrap">
                  <span class="price h3 text-warning">
                    <span class="currency">{launch?.launch_year}</span>
                  </span>
                </p>
                <dl class="item-property">
                  <dt>Description</dt>
                  <dd>
                    <p>
                      {launch?.details}
                    </p>
                  </dd>
                </dl>
                <dl class="param param-feature">
                  <dt>Reason of Failure</dt>
                  <dd>{launch?.launch_failure_details?.reason}</dd>
                </dl>
                <dl class="param param-feature">
                  <dt>Article Link</dt>
                  <a href={launch?.links?.article_link} target="_blank">{launch?.links?.article_link}</a>
                </dl>
                <dl class="param param-feature">
                  <dt>Video Link</dt>
                  <a href={launch?.links?.video_link} target="_blank">{launch?.links?.video_link}</a>
                </dl>
              </article>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context){
  const slug = context.query.singleId
  let data = await fetch(`https://api.spacexdata.com/v3/launches/${slug}`)
  let myprops = await data.json()

  return {
    props: {myprops}
  }
}

export default SingleLaunch;
