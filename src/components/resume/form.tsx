import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Resume } from "@/types/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonthRangePicker } from "../ui/monthrangepicker";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Normal fields
function BasicDetailsFields() {
  const { register } = useFormContext<Resume>();
  return (
    <>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input {...register("fullName")} />
      </div>
      <div className="space-y-2">
        <Label>Address</Label>
        <Input {...register("address")} />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register("email")} />
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input {...register("phoneNumber")} />
      </div>
    </>
  );
}

// Links
function LinksFields() {
  const { register, control } = useFormContext<Resume>();
  const links = useFieldArray({ control, name: "links" });
  return (
    <div className="space-y-3 col-span-2">
      <Label>Links</Label>
      <div className="border bg-card p-5 rounded-lg space-y-5">
        {links.fields.map((link, idx) => (
          <div key={idx} className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input {...register(`links.${idx}.label`)} />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input {...register(`links.${idx}.url`)} />
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full" type="button">
        Add links
      </Button>
    </div>
  );
}

// Work Histories
function WorkHistoriesFields() {
  const { register, control } = useFormContext<Resume>();
  const workHistories = useFieldArray({ control, name: "workHistories" });
  return (
    <div className="space-y-3 col-span-2">
      {workHistories.fields.map((workHistory, idx) => (
        <div className="border bg-card p-5 rounded-lg space-y-5" key={idx}>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input {...register(`workHistories.${idx}.title`)} />
            </div>
            <div className="space-y-2">
              <Label>Employer</Label>
              <Input {...register(`workHistories.${idx}.company`)} />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !workHistory.period.from &&
                        !workHistory.period.to &&
                        "text-muted-foreground"
                    )}
                  >
                    {workHistory.period.from && workHistory.period.to ? (
                      <span>
                        {format(workHistory.period.from, "MMM yyyy")} -{" "}
                        {format(workHistory.period.to, "MMM yyyy")}
                      </span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthRangePicker
                    maxDate={new Date()}
                    selectedMonthRange={{
                      start: workHistory.period.from,
                      end: workHistory.period.to,
                    }}
                    onMonthRangeSelect={({ start, end }) => {
                      workHistories.update(idx, {
                        ...workHistory,
                        period: { from: start, to: end },
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 ">
              <Label>Location</Label>
              <Input {...register(`workHistories.${idx}.location`)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...register(`workHistories.${idx}.summary`)} />
          </div>
        </div>
      ))}
      <Button className="w-full">Add work experience</Button>
    </div>
  );
}

// Education
function EducationFields() {
  const { register, control } = useFormContext<Resume>();
  const educationHistories = useFieldArray({
    control,
    name: "educationHistories",
  });
  return (
    <div className="space-y-3 col-span-2">
      <Label>Education</Label>
      {educationHistories.fields.map((educationHistory, idx) => (
        <div className="border bg-card p-5 rounded-lg space-y-5" key={idx}>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>School</Label>
              <Input {...register(`educationHistories.${idx}.institution`)} />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input {...register(`educationHistories.${idx}.qualification`)} />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !educationHistory.period.from &&
                        !educationHistory.period.to &&
                        "text-muted-foreground"
                    )}
                  >
                    {educationHistory.period.from &&
                    educationHistory.period.to ? (
                      <span>
                        {format(educationHistory.period.from, "MMM yyyy")} -{" "}
                        {format(educationHistory.period.to, "MMM yyyy")}
                      </span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthRangePicker
                    maxDate={new Date()}
                    selectedMonthRange={{
                      start: educationHistory.period.from,
                      end: educationHistory.period.to,
                    }}
                    onMonthRangeSelect={({ start, end }) => {
                      educationHistories.update(idx, {
                        ...educationHistory,
                        period: { from: start, to: end },
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 ">
              <Label>Location</Label>
              <Input {...register(`educationHistories.${idx}.location`)} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea {...register(`educationHistories.${idx}.details`)} />
            </div>
          </div>
        </div>
      ))}
      <Button className="w-full">Add education</Button>
    </div>
  );
}

// Extra Sections
function ExtraSectionsFields() {
  const { control } = useFormContext<Resume>();
  const extraSections = useFieldArray({ control, name: "extraSections" });
  return (
    <div className="space-y-3 col-span-2">
      <Label>Addition Sections</Label>
      {extraSections.fields.map((_, idx) => (
        <div className="border p-5 rounded-lg space-y-5" key={idx}>
          <div className="grid w-full  grid-cols-2 gap-5">
            <div className="space-y-2 col-span-2">
              <Label>Section Title</Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal")}
                  >
                    <span>Pick a month</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthRangePicker maxDate={new Date()} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 ">
              <Label>Location</Label>
              <Input />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea />
          </div>
          <Button className="w-full">Add more</Button>
        </div>
      ))}
    </div>
  );
}

export const ResumeForm = () => {
  return (
    <div className="grid grid-cols-2 gap-5 pr-5">
      <BasicDetailsFields />

      <Accordion type="single" collapsible className="col-span-2">
        <AccordionItem value="links">
          <AccordionTrigger>Links</AccordionTrigger>
          <AccordionContent>
            <LinksFields />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="work-histories" className="col-span-2">
          <AccordionTrigger className="w-full">
            Work Experience
          </AccordionTrigger>
          <AccordionContent>
            <WorkHistoriesFields />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="col-span-2">
          <AccordionTrigger className="w-full">Education</AccordionTrigger>
          <AccordionContent>
            <EducationFields />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="extra-section" className="col-span-2">
          <AccordionTrigger className="w-full">Extra Section</AccordionTrigger>
          <AccordionContent>
            <ExtraSectionsFields />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
