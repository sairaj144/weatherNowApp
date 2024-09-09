import {Component} from 'react'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MdOutlineLocationSearching } from "react-icons/md";

import './index.css'


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CityTable extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    hasMore: true,
    offset: 0,
    limit: 20,
    searchInput: '',
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const { offset,limit } = this.state;
    console.log(offset)
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?offset=${offset}&limit=${limit}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      
      this.setState((prevState) => ({
        repositoriesData: [...prevState.repositoriesData, ...fetchedData.results],
        apiStatus: apiStatusConstants.success,
        offset: prevState.offset + limit,
        hasMore: fetchedData.results.length > 0 ,
      }))
    } else  {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    const searchtxt = event.target.value;
    
    this.setState({ searchInput:searchtxt });
  };

  renderLoadingView = () => (
    <div data-testid="loader" className='spinner'>
       <Oval 
        height={80}
        width={80}
        color="blue"
        ariaLabel="loading"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
      <button type='button' className='btn-retry' onClick={this.getRepositories}>retry</button>
    </div>
  )

  renderRepositoriesListView = () => {
    const { hasMore, repositoriesData,searchInput} = this.state

    const filteredData = repositoriesData.filter((eachCity) => {
      return eachCity.ascii_name.toLowerCase().includes(searchInput.toLowerCase());
    });
    
    console.log(filteredData,searchInput)

    return (
      <InfiniteScroll
        dataLength={filteredData.length}
        next={this.getRepositories}
        hasMore={hasMore}
        loader={this.renderLoadingView()}
        endMessage={<p style={{ textAlign: 'center' }}>No more cities to display</p>}
      >
        <table className='tableContainer'>
          <thead>
            <tr className='tableHead'>
              <th >City Name</th>
              <th >Country</th>
              <th >Timezone</th>
            </tr>
          </thead>
            {filteredData.map((city) => (
              <tr key={city.geoname_id} className='tableRow'>
                <td className='link-btn'><Link  to={`/weather/${city.ascii_name}`}>{city.ascii_name},{city.country_code}</Link></td>
                <td className='coutry-name'>{city.cou_name_en}</td>
                <td className='timezone'>{city.timezone}</td>
              </tr>
            ))}
        </table>

      </InfiniteScroll>
      
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }


  render() {
    const {searchInput}=this.state
    return (
      <div className="app-container">
        <div id="scrollable-table-container" className="responsive-container">
          <h1 className='heading'>Find Weather Insights for Your Location</h1>
          <div className='searchContainer'> 
          <input
            className='searchBar'
            type="search"
            placeholder="Search for a city"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <MdOutlineLocationSearching className='searchIcon' />
          </div>
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default CityTable;