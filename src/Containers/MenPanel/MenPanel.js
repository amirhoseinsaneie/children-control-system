import { Component } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import Dad from "../../Components/Icons/Dad";

class MenPanel extends Component {
  render() {
    return (
      <div className="panel">
        <DataTable
          entryURL="/boys-entry"
          deliverURL="/father-delivery"
          title="پذیرش پدران"
          icon={<Dad fill='black' />}
        />
      </div>
    );
  }
}

export default MenPanel;
