import React from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {
  CalendarDate,
  getLocalTimeZone,
  isToday,
} from "@internationalized/date";
import { cn } from "@/lib/utils";
import {DateValue} from "@react-types/calendar"
const CalendarCell = ({
  state,
  date,
  currentMonth,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean
}) => {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateToday = isToday(date, getLocalTimeZone());
  const finalIsDisabled = isDisabled || isUnavailable
  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`cell size-10 outline-none rounded-md ${isSelected ? "bg-primary text-black" : ""} ${
          finalIsDisabled ? "text-muted-foreground cursor-not-allowed" : ""
        } ${isUnavailable ? "unavailable" : ""}`}
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold"
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-1.5 bg-primary rounded-full"></div>
          )}
        </div>
      </div>
    </td>
  );
};

export default CalendarCell;
