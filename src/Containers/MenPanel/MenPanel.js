import { Component } from "react";
import DataTable from "../../Components/DataTable/DataTable";

class MenPanel extends Component {
    render() {
        return (
          <div className="panel">
          <h1 className="panel-title">پذیرش پدران</h1>
          <DataTable entryURL="/boys-entry" deliverURL="/father-delivery" />
          </div>)
    }
}
	

export default MenPanel;