import React from 'react';
import Form from '../common/form/form'

class FilterPanel extends Form {
  state = {

  };
  handelChange = ({ currentTarget: input }) => {
    console.log(input)
    this.filterGrid();
  };
  renderFilters() {
    return (
      <React.Fragment>
        <div className="col-md-12 mt-5 p-0 list-group-item list-group-item-action animate__animated animate__fadeIn">
          <div className="filters_root ">
            <article className="card-group-item">
              <header className="card-header filters_header">
                <h6 className="title">Filter</h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <form >
                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.filter}
                        onChange={this.handelChange}
                      />
                      <span className="form-check-label">Favorite</span>
                    </label>
                  </form>
                </div>
              </div>
            </article>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FilterPanel;
