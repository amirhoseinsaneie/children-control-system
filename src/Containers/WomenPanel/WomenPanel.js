import { Component } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import Mom from "../../Components/Icons/Mom";

class WomenPanel extends Component {
  render() {
    return (
      <div className="panel">
        <DataTable
          entryURL="/girls-entry"
          deliverURL="/mother-delivery"
          title="پذیرش مادران"
          icon={<Mom fill='black' />}
        />
      </div>
    );
  }
}

export default WomenPanel;
