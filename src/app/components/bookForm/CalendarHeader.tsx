import type { AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { CalendarState } from "@react-stately/calendar";
import type { DOMAttributes, FocusableElement } from "@react-types/shared";
import { ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import CalendarButton from "./CalendarButton";

const CalendarHeader = ({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
}) => {
  const monthDateFormatter = useDateFormatter({
    month: 'short',
    year: 'numeric',
    timeZone: state.timeZone,
  })
  const [monthName, _, year] = monthDateFormatter.formatToParts(
    state.visibleRange.start.toDate(state.timeZone)).map((part) => part.value)
    return (
        <div className="flex items-center pb-4">
            <VisuallyHidden>
                <h2>
                   {calendarProps["aria-label"]} 
                </h2>
            </VisuallyHidden>
            
            <div className="flex items-center gap-2">
                <CalendarButton {...prevButtonProps}>
                    <ChevronLeft size="size-4"/>
                </CalendarButton>
                <h2 className="font-semibold">
                {monthName} <span className="text-muted-foreground text-sm font-medium">{year}</span>
            </h2>
                <CalendarButton {...nextButtonProps}>
                    <ChevronRight size="size-4"/>
                </CalendarButton>
            </div>
        </div>
    )
};

export default CalendarHeader;
