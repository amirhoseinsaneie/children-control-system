import { Component } from "react";
import DataTable from "../../Components/DataTable/DataTable";

class WomenPanel extends Component {
    render() {
        return (
          <div className="panel">
          <h1 className="panel-title">پذیرش مادران</h1>
          <DataTable entryURL="/girls-entry" deliverURL="/mother-delivery" />
          </div>)
    }
}
	

export default WomenPanel;