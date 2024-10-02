import React from 'react';
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

export class NavLink extends React.Component {
  render() {
    const { active, children, path, onClick } = this.props;

    return (
      <a onClick={onClick}>
        <Link
          className="uppercase cursor-pointer flex flex-col gap-4"
          to={path}
          data-testid={active ? "active-category-link" : "category-link"}
        >
          <span
            className={cn("px-2 font-semibold transition", {
              "text-primary": active
            })}
          >
            {children}
          </span>
          <div
            className={cn(`h-1 w-full transition`, {
              "bg-primary": active
            })}
          >
          </div>
        </Link>
      </a>
    );
  }
}
