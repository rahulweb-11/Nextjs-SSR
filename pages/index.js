import { Inter } from "next/font/google";
import Sidebar from "./sidebar";
import Home from "./home";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function App(props) {
  console.log(props, "props");
  const [launches, setLaunches] = useState(props.myprop);
  const [chkRadio, setChkRadio] = useState();



  useEffect(() => {
    const ss = localStorage.getItem("radio");
    if(ss){
      axios.get(`https://api.spacexdata.com/v3/launches?launch_success=${ss}`).then((res)=>{
        setLaunches(res.data)
      })
    }
  }, []);

  const handleSelectChange = (e) => {
    axios
      .get(
        `https://api.spacexdata.com/v3/launches?launch_year=${e.target.value}`
      )
      .then((res) => {
        setLaunches(res.data);
      });
  };

  const parentFunction = (e) => {
    setChkRadio(e.target.value)
  }

  useEffect(()=>{
    if(chkRadio){
      axios
      .get(
        `https://api.spacexdata.com/v3/launches?launch_success=${chkRadio}`
      )
      .then((res) => {
        setLaunches(res.data);
      });
    }
  },[chkRadio])

  return (
    <>
      <div class="container">
        <div class="row">
          <Sidebar parentFunction={parentFunction}/>
          <main class="col-md-9">
            <header class="border-bottom mb-4 pb-3">
              <div class="form-inline">
                <span class="mr-md-auto text-white">{launches?.length} Items found </span>
                <select class="mr-2 form-control" onChange={handleSelectChange}>
                  <option value="">Filter By Year</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>
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

export async function getServerSideProps(context) {
  let data = await fetch("https://api.spacexdata.com/v3/launches");
  let myprop = await data.json();

  return {
    props: { myprop },
  };
}
