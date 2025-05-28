import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeT } from "@/types/form";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonthRangePicker } from "../ui/monthrangepicker";

export const ResumeForm = () => {
  const { register } = useFormContext<ResumeT>();

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input {...register("name")} />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input {...register("location")} />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register("email")} />
      </div>

      <div className="space-y-2">
        <Label>Phone</Label>
        <Input {...register("phone")} />
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Links</Label>

        <div className="border p-5 rounded-lg space-y-5">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>URL</Label>
              <Input />
            </div>
          </div>

          <Button className="w-full">Add more</Button>
        </div>
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Work experience</Label>

        <div className="border p-5 rounded-lg space-y-5">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Employer</Label>
              <Input />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Start and End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal"
                      // !field.value && "text-muted-foreground"
                    )}
                  >
                    {/* {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a month</span>
                      )} */}
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
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Education</Label>

        <div className="border p-5 rounded-lg space-y-5">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>School</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Degree</Label>
              <Input />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Start and End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal"
                      // !field.value && "text-muted-foreground"
                    )}
                  >
                    {/* {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a month</span>
                      )} */}
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
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Addition Sections</Label>

        <div className="border p-5 rounded-lg space-y-5">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2">
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
              <Label>Start and End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal"
                      // !field.value && "text-muted-foreground"
                    )}
                  >
                    {/* {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a month</span>
                      )} */}
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
      </div>
    </div>
  );
};
