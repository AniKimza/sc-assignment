import { Nav } from "./components/nav";
import { NavLink } from "./components/nav/link";
import { cn } from "./utils/cn";
import React from "react";
import CartPopup from "./components/cart";
import { CartOverLayContext } from "./state/CartOverlay";
import { CartProvider } from "react-use-cart";
import { Switch, Route } from "react-router-dom";
import { ProductsPage } from "./pages/products-page";
import ProductPage from "./pages/product-page"
import { withRouter } from "./utils/withRouter";

class App extends React.Component {
  state = {
    location: this.props.location.pathname
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.location.pathname === "/") {
      this.props.history.push("/all")
      this.setState({ location: "/all" })
    }
  }

  render() {
    const { location } = this.state;
    return (
      <>
        <CartOverLayContext.Consumer>
          {(cartOverLay) =>
            <CartProvider>
              <header>
                <Nav toggleCartPopupOpen={cartOverLay.toggleCartPopupOpen} isCartPopupOpen={cartOverLay.isCartOpen}>
                  <NavLink active={location === "/all"} path="/all" onClick={() => { this.setState({ location: "/all" }) }} >All</NavLink>
                  <NavLink active={location === "/clothes"} path="/clothes" onClick={() => { this.setState({ location: "/clothes" }) }} >Clothes</NavLink>
                  <NavLink active={location === "/tech"} path="/tech" onClick={() => { this.setState({ location: "/tech" }) }}>Tech</NavLink>
                </Nav>
              </header>
              <main className="relative px-[8vw] w-full">
                <CartPopup />
                <div
                  className={cn("z-10 absolute top-0 left-0 right-0 h-svh transition", {
                    "bg-black/45": cartOverLay.isCartOpen,
                    "hidden": !cartOverLay.isCartOpen
                  })}
                  data-testid="cart-overlay"
                  onClick={() => cartOverLay.setIsCartOpen(false)}
                />
                <Switch>
                  <Route path="/all" render={(props) => <ProductsPage{...props} id="all-products" category="" />} />
                  <Route path="/clothes" render={(props) => <ProductsPage {...props} id="clothes-products" category="clothes" />} />
                  <Route path="/tech" render={(props) => <ProductsPage {...props} id="tech-products" category="tech" />} />
                  <Route path="/products/:id" render={(props) => <ProductPage {...props} />} />
                </Switch>
              </main>
            </CartProvider>
          }
        </CartOverLayContext.Consumer>
      </>
    );
  }
}
const AppWithRouter = withRouter(App);
export default AppWithRouter;
