import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Resume, ResumeTemplate } from "@/types/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  CalendarIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MonthPicker } from "../ui/monthpicker";

// Normal fields
function BasicDetailsFields() {
  const { register } = useFormContext<Resume>();
  return (
    <>
      <div className="space-y-2">
        <Label>
          <span className="inline-flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Name
          </span>
        </Label>
        <Input {...register("fullName")} />
      </div>
      <div className="space-y-2">
        <Label>
          <span className="inline-flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            Address
          </span>
        </Label>
        <Input {...register("address")} />
      </div>
      <div className="space-y-2">
        <Label>
          <span className="inline-flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            Email
          </span>
        </Label>
        <Input {...register("email")} />
      </div>
      <div className="space-y-2">
        <Label>
          <span className="inline-flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Phone Number
          </span>
        </Label>
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
      {links.fields.length > 0 ? (
        <div className="border bg-card p-5 rounded-lg space-y-5">
          {links.fields.map((_, idx) => (
            <div key={idx} className="grid w-full grid-cols-5 gap-5">
              <div className="space-y-2 col-span-2">
                <Label>
                  <span className="inline-flex items-center gap-2">
                    <TagIcon className="w-4 h-4" />
                    Label
                  </span>
                </Label>
                <Input {...register(`links.${idx}.label`)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>
                  <span className="inline-flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    URL
                  </span>
                </Label>
                <Input {...register(`links.${idx}.url`)} />
              </div>

              <Button
                className="self-end"
                variant="destructive"
                onClick={() => links.remove(idx)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : null}
      <Button
        className="w-full"
        type="button"
        onClick={() =>
          links.append({
            label: "",
            url: "",
          })
        }
      >
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
        <div
          className="border bg-card p-5 flex flex-col rounded-lg space-y-5"
          key={idx}
        >
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
          <div className="grid w-full grid-cols-4 gap-5">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !workHistory.period.from && "text-muted-foreground",
                    )}
                  >
                    {workHistory.period.from ? (
                      <span>{format(workHistory.period.from, "MMM yyyy")}</span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthPicker
                    onMonthSelect={(month) => {
                      workHistories.update(idx, {
                        ...workHistory,
                        period: { ...workHistory.period, from: month },
                      });
                    }}
                    selectedMonth={workHistory.period.from}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",

                      !workHistory.period.to && "text-muted-foreground",
                    )}
                  >
                    {workHistory.period.to ? (
                      <span>{format(workHistory.period.to, "MMM yyyy")}</span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthPicker
                    onMonthSelect={(month) => {
                      workHistories.update(idx, {
                        ...workHistory,
                        period: { ...workHistory.period, to: month },
                      });
                    }}
                    selectedMonth={workHistory.period.to}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Location</Label>
              <Input {...register(`workHistories.${idx}.location`)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...register(`workHistories.${idx}.summary`)} />
          </div>

          <Button
            className="self-end"
            variant="destructive"
            onClick={() => workHistories.remove(idx)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        className="w-full"
        onClick={() =>
          workHistories.append({
            company: "",
            location: "",
            period: {
              from: undefined,
              to: undefined,
            },
            summary: "",
            title: "",
          })
        }
      >
        Add work experience
      </Button>
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
      {educationHistories.fields.map((educationHistory, idx) => (
        <div
          className="border bg-card p-5 rounded-lg space-y-5 flex flex-col"
          key={idx}
        >
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
          <div className="grid w-full grid-cols-4 gap-5">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !educationHistory.period.from && "text-muted-foreground",
                    )}
                  >
                    {educationHistory.period.from ? (
                      <span>
                        {format(educationHistory.period.from, "MMM yyyy")}
                      </span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthPicker
                    onMonthSelect={(month) => {
                      educationHistories.update(idx, {
                        ...educationHistory,
                        period: { ...educationHistory.period, from: month },
                      });
                    }}
                    selectedMonth={educationHistory.period.from}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",

                      !educationHistory.period.to && "text-muted-foreground",
                    )}
                  >
                    {educationHistory.period.to ? (
                      <span>
                        {format(educationHistory.period.to, "MMM yyyy")}
                      </span>
                    ) : (
                      <span>Pick a month</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <MonthPicker
                    onMonthSelect={(month) => {
                      educationHistories.update(idx, {
                        ...educationHistory,
                        period: { ...educationHistory.period, to: month },
                      });
                    }}
                    selectedMonth={educationHistory.period.to}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Location</Label>
              <Input {...register(`educationHistories.${idx}.location`)} />
            </div>
            <div className="space-y-2 col-span-4">
              <Label>Description</Label>
              <Textarea {...register(`educationHistories.${idx}.details`)} />
            </div>
          </div>

          <Button
            className="self-end"
            variant="destructive"
            onClick={() => educationHistories.remove(idx)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        className="w-full"
        onClick={() =>
          educationHistories.append({
            details: "",
            institution: "",
            qualification: "",
            period: {
              from: undefined,
              to: undefined,
            },
            location: "",
          })
        }
      >
        Add education
      </Button>
    </div>
  );
}

// Extra Sections
function ExtraSectionsFields() {
  const { control, register } = useFormContext<Resume>();
  const extraSections = useFieldArray({ control, name: "extraSections" });
  return (
    <div className="space-y-3 col-span-2">
      {extraSections.fields.map((section, idx) => (
        <div className="border p-5 rounded-lg space-y-5 bg-card" key={idx}>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-2 col-span-2">
              <Label>Section Title</Label>
              <Input {...register(`extraSections.${idx}.sectionName`)} />
            </div>

            {section.items.length > 0 ? (
              <div className="pl-5 col-span-2 space-y-5 border-l">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-5 bg-card col-span-2 grid w-full relative grid-cols-2 gap-5 rounded-lg border"
                  >
                    <div className="bg-primary absolute left-[-33px] grid size-[24px] text-background rounded-full">
                      <div className="m-auto font-semibold">{itemIdx + 1}</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        {...register(
                          `extraSections.${idx}.items.${itemIdx}.title`,
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Organization</Label>
                      <Input
                        {...register(
                          `extraSections.${idx}.items.${itemIdx}.organization`,
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-4 col-span-2 gap-5">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !item.period.from && "text-muted-foreground",
                              )}
                            >
                              {item.period.from ? (
                                <span>
                                  {format(item.period.from, "MMM yyyy")}
                                </span>
                              ) : (
                                <span>Pick a month</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <MonthPicker
                              onMonthSelect={(month) => {
                                const updatedSection = {
                                  ...section,
                                  items: section.items.map((it, i) =>
                                    i === itemIdx
                                      ? {
                                          ...it,
                                          period: { ...it.period, from: month },
                                        }
                                      : it,
                                  ),
                                };
                                extraSections.update(idx, updatedSection);
                              }}
                              selectedMonth={item.period.from}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",

                                !item.period.to && "text-muted-foreground",
                              )}
                            >
                              {item.period.to ? (
                                <span>
                                  {format(item.period.to, "MMM yyyy")}
                                </span>
                              ) : (
                                <span>Pick a month</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <MonthPicker
                              onMonthSelect={(month) => {
                                const updatedSection = {
                                  ...section,
                                  items: section.items.map((it, i) =>
                                    i === itemIdx
                                      ? {
                                          ...it,
                                          period: { ...it.period, to: month },
                                        }
                                      : it,
                                  ),
                                };
                                extraSections.update(idx, updatedSection);
                              }}
                              selectedMonth={item.period.to}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2 col-span-2">
                        <Label>Location</Label>
                        <Input
                          {...register(
                            `extraSections.${idx}.items.${itemIdx}.location`,
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register(
                          `extraSections.${idx}.items.${itemIdx}.details`,
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <Button
            className="w-full"
            onClick={() =>
              extraSections.update(idx, {
                ...section,
                items: [
                  ...section.items,
                  {
                    details: "",
                    location: "",
                    organization: "",
                    period: {
                      from: undefined,
                      to: undefined,
                    },
                    title: "",
                  },
                ],
              })
            }
          >
            Add items
          </Button>
        </div>
      ))}

      <Button
        className="w-full"
        onClick={() =>
          extraSections.append({
            sectionName: "",
            items: [
              {
                details: "",
                location: "",
                organization: "",
                period: {
                  from: undefined,
                  to: undefined,
                },
                title: "",
              },
            ],
          })
        }
      >
        Add more sections
      </Button>
    </div>
  );
}

const TemplateSelector = () => {
  const { setValue, watch } = useFormContext<Resume>();
  const template = watch("template");

  return (
    <div className="col-span-2 space-y-3 flex flex-col">
      <Label htmlFor="template-select">Template</Label>
      <Select
        onValueChange={(v) => setValue("template", v as ResumeTemplate)}
        value={template}
        name="template"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a resume template..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Professional</SelectItem>
          <SelectItem value="minimal">Minimal</SelectItem>
          <SelectItem value="modern">Modern</SelectItem>
        </SelectContent>
      </Select>

      <a
        target="_blank"
        className="text-sm text-muted-foreground underline underline-offset-4 ml-auto"
        href="https://github.com/ksamirdev/resuma/discussions/categories/request-template"
      >
        Request Template
      </a>
    </div>
  );
};

function SkillsFields() {
  const { register, control } = useFormContext<Resume>();
  const skills = useFieldArray({ control, name: "skills" });
  return (
    <div className="space-y-3 col-span-2">
      {skills.fields.length > 0 ? (
        <div className="border bg-card p-5 rounded-lg space-y-5">
          {skills.fields.map((_, idx) => (
            <div key={idx} className="grid w-full grid-cols-5 gap-5">
              <div className="space-y-2 col-span-2">
                <Label>
                  <span className="inline-flex items-center gap-2">
                    <TagIcon className="w-4 h-4" />
                    Label
                  </span>
                </Label>
                <Input {...register(`skills.${idx}.label`)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>
                  <span className="inline-flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Value
                  </span>
                </Label>
                <Input {...register(`skills.${idx}.value`)} />
              </div>

              <Button
                className="self-end"
                variant="destructive"
                onClick={() => skills.remove(idx)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : null}
      <Button
        className="w-full"
        type="button"
        onClick={() =>
          skills.append({
            label: "",
            value: "",
          })
        }
      >
        Add skill
      </Button>
    </div>
  );
}

export const ResumeForm = () => {
  return (
    <div className="grid grid-cols-2 gap-5 pr-5">
      <TemplateSelector />

      <hr className="col-span-2" />

      <BasicDetailsFields />
      <hr className="col-span-2" />

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

        <AccordionItem value="skills" className="col-span-2">
          <AccordionTrigger className="w-full">Skills</AccordionTrigger>
          <AccordionContent>
            <SkillsFields />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="extra-section" className="col-span-2">
          <AccordionTrigger className="w-full">
            Addition Sections
          </AccordionTrigger>
          <AccordionContent>
            <ExtraSectionsFields />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// const RenderSampleTemplate = ({
//   file,
//   label,
//   template,
// }: {
//   file: string;
//   label: string;
//   template: ResumeTemplate;
// }) => {
//   const [numPages, setNumPages] = useState<number>(1);
//   const form = useFormContext<Resume>();

//   return (
//     <div
//       className={cn(
//         "rounded border shadow overflow-y-auto p-3 pt-0 relative flex flex-col hover:bg-card group",
//         template === form.getValues().template && "bg-card"
//       )}
//       style={{ height: 380 }}
//     >
//       <div
//         className="absolute inset-0 z-[100] cursor-pointer"
//         onClick={() => form.setValue("template", template)}
//       ></div>

//       <span
//         className={cn(
//           "text-lg font-bold sticky top-0 z-50  w-full group-hover:bg-card py-3",
//           template === form.getValues().template && "bg-card"
//         )}
//       >
//         {label}
//       </span>

//       <Document
//         file={file}
//         loading={
//           <div className="text-center text-muted-foreground">Loading...</div>
//         }
//         error={
//           <div className="text-center text-red-500">Failed to load PDF</div>
//         }
//         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//         className="w-min"
//       >
//         {Array.from({ length: numPages }, (_, i) => (
//           <Page
//             key={i}
//             pageNumber={i + 1}
//             height={350}
//             className="overflow-hidden h-[350px] "
//           />
//         ))}
//       </Document>
//     </div>
//   );
// };
