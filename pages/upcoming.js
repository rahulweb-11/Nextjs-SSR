import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Link from "next/link";
import axios from "axios";

function Upcoming(props) {
    console.log(props)
    const [launches, setLaunches] = useState(props.myprop)
  return (
    <>
      <div class="container">
        <div class="row">
          <main class="col-md-9">
            <header class="border-bottom mb-4 pb-3">
              <div class="form-inline">
                <span class="mr-md-auto text-white">{launches?.length} Items found </span>
                <header>
                <h4 className="text-white">Upcoming Launches</h4>
            </header>
              </div>
            </header>

            <div class="row">
              {launches?.map((item, index) => (
                <div class="col-md-4">
                  <figure class="card card-product-grid">
                    <div class="img-wrap">
                      <span class="badge badge-danger"> NEW </span>
                      <img
                        style={{ height: "200px", width: "180px" }}
                        src={item?.links?.mission_patch_small}
                        class="img-fluid"
                      />
                      <Link
                        class="btn-overlay"
                        href={`/single/${item.flight_number}`}
                      >
                        <i class="fa fa-search-plus"></i> Quick view
                      </Link>
                    </div>
                    <figcaption class="info-wrap">
                      <div class="fix-height">
                        <p class="title">
                          {item?.mission_name} - {item?.launch_year}
                        </p>
                        <div class="price-wrap mt-2">
                          <span class="price">
                            {item?.details?.slice(0, 60) + "..."}
                          </span>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Upcoming;

export async function getServerSideProps(context) {
  let data = await fetch("https://api.spacexdata.com/v3/launches/upcoming");
  let myprop = await data.json();

  return {
    props: { myprop },
  };
}
