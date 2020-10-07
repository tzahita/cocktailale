import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
class About extends Component {
  state = {
    title: 'About Us',
  };
  render() {
    return (
      <div className="container mb-4">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12">
            <h5>Here We Should Show Information About Us!</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              repellendus quam itaque molestiae iusto voluptatum tempore velit
              doloribus, dolores voluptates pariatur? Eveniet, deleniti ab illo,
              dolore dolores labore nostrum ullam amet vero quia magnam tempore
              neque consequatur sequi obcaecati debitis rerum inventore fuga
              blanditiis. In, aliquid. Quibusdam illum consectetur cupiditate?
              Veniam assumenda ratione odit iure est soluta ut sed reprehenderit
              cumque earum quod debitis exercitationem iste totam sequi, odio
              cupiditate? Repellendus dolorum harum autem odio hic iste
              provident ipsum fugiat nisi recusandae aperiam, consequuntur nulla
              quos aut dicta illo veritatis! Aliquid numquam soluta ducimus,
              officia accusamus animi corporis quas provident?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aut,
              voluptatibus nesciunt reprehenderit dolores quasi voluptate
              consequatur ea, neque mollitia ipsum eius eum velit omnis ut,
              assumenda illo officia nihil. Voluptatem doloremque culpa ab ad.
              Voluptatibus perferendis quo eum iste quae a molestiae
              reprehenderit distinctio velit, tempora vero ipsum ratione
              repudiandae tenetur iure debitis quas doloribus dicta ducimus. Ea
              maiores nulla soluta ipsam natus quisquam veniam accusantium et
              fuga dolorum rerum, eius provident iusto! Animi obcaecati iusto
              exercitationem debitis quibusdam eum nisi reprehenderit repellat?
              Debitis ex sint, rerum suscipit dolorum officia cumque neque,
              recusandae, laudantium distinctio delectus ipsum repellendus
              tempora?
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Repellendus laboriosam earum officia commodi. Perferendis rerum
              atque cum iste fugiat totam sequi assumenda dignissimos tempore!
              Quaerat doloribus iste, consequatur architecto commodi corrupti
              nam ipsa eligendi, deserunt ex qui nesciunt omnis velit. Explicabo
              voluptatem nihil accusantium! Sunt ratione numquam dolorem! Natus
              recusandae placeat, ex praesentium suscipit, quam tempore deserunt
              delectus nihil quis doloremque voluptatibus id corrupti eaque
              ipsam illo officia reprehenderit eos earum veniam at, soluta quod.
              Voluptatum, mollitia voluptatem quia eaque, nemo ratione maiores
              ex fugit architecto quaerat expedita error ducimus placeat. Et
              fugit deserunt culpa alias beatae natus laudantium. Consectetur!
            </p>
          </div>
          <div className="col-md-5 col-sm-12 pb-5">
            <img
              src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              alt="data"
              className=" img-responsive shadow rounded"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
