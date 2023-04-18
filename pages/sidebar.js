import Link from "next/link";
import { useEffect, useState } from "react";

function Sidebar(props) {
  const [checkedVal, setChackedVal] = useState([]);
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());

  const handleChange = (e) => {
    setChackedVal(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("radio", checkedVal);
  }, [checkedVal]);

  const handleDateTo = (e) =>{
    
    setDateTo(e.target.value)
  }

  const handleDateFrom = (e) =>{
    setDateFrom(e.target.value)
  }

  const handleDateSubmit = () =>{
    
  }
  return (
    <>
      <aside class="col-md-3">
        <div class="card mt-4">
          <article class="filter-group">
            <header class="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_1"
                aria-expanded="true"
                class=""
              >
                <i class="icon-control fa fa-chevron-down"></i>
                <h6 class="title">Product type</h6>
              </a>
            </header>
            <div class="filter-content collapse show" id="collapse_1">
              <div class="card-body">
                <form class="pb-3">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-light" type="button">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>

                <ul class="list-menu">
                  <li>
                    <Link href="/upcoming">Upcoming Launches </Link>
                  </li>
                  <li>
                    <Link href="next">Next Launches </Link>
                  </li>
                  <li>
                    <Link href="past">Past Launches </Link>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_2"
                aria-expanded="true"
                class=""
              >
                <i class="icon-control fa fa-chevron-down"></i>
                <h6 class="title">Filter By Launch Success </h6>
              </a>
            </header>

            <div class="filter-content collapse show" id="collapse_2">
              <div class="card-body">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="true"
                    onChange={props.parentFunction}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Success
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="false"
                    onChange={props.parentFunction}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Failure
                  </label>
                </div>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_3"
                aria-expanded="true"
                class=""
              >
                <i class="icon-control fa fa-chevron-down"></i>
                <h6 class="title">Date range </h6>
              </a>
            </header>
            <div class="filter-content collapse show" id="collapse_3">
              <div class="card-body">
                  <div class="form-row">
                  <div class="form-group col-md-8">
                    <label>To</label>
                    <input
                      class="form-control"
                      type="date"
                      value={dateTo}
                      onChange={handleDateTo}
                    />
                  </div>
                  <div class="form-group text-right col-md-8">
                    <label>From</label>
                    <input
                      class="form-control"
                      type="date"
                      value={dateFrom}
                      onChange={handleDateFrom}
                    />
                  </div>
                </div>
                <Link href={`/datefilter?start=${dateTo}&end=${dateFrom}`} class="btn btn-block btn-primary mt-2">Apply</Link>
              </div>
            </div>
          </article>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
