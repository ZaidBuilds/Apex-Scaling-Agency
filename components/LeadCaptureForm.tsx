"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, Send, Loader2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

type FormData = {
  serviceNeeded: string;
  timeline: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  businessName: string;
};

const INITIAL_DATA: FormData = {
  serviceNeeded: "",
  timeline: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  businessName: "",
};

export default function LeadCaptureForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Slide transitions variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const [slideDirection, setSlideDirection] = useState(1);

  const setStepWithDirection = (nextStep: number) => {
    setSlideDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  // Option lists
  const services = [
    { id: "simple", label: "Simple Website (Starter Package)", description: "Best for local shops, cafes, clinics (5 pages)" },
    { id: "growth", label: "Interactive Growth Website", description: "Best for growing businesses, animations (8 pages)" },
    { id: "premium", label: "Premium 3D & Custom App", description: "Best for high-end brands, startups, custom 3D integrations" },
    { id: "ecommerce", label: "E-Commerce Store", description: "Product listings, checkout flows, payment gateways" },
  ];

  const timelines = [
    { id: "asap", label: "ASAP (Within 2 weeks)", description: "High priority, fast-tracked delivery" },
    { id: "normal", label: "2-4 Weeks", description: "Standard development lifecycle" },
    { id: "flexible", label: "Flexible (1 Month+)", description: "Standard priority timeline" },
  ];

  const budgets = [
    { id: "starter", label: "₹10,000 — ₹15,000", description: "Standard local setups" },
    { id: "growth", label: "₹15,000 — ₹25,000", description: "Interactive custom websites" },
    { id: "premium", label: "₹25,000+", description: "E-commerce or custom 3D applications" },
    { id: "notsure", label: "Not sure / Flexible", description: "Discuss pricing during discovery call" },
  ];

  const handleSelectOption = (field: keyof FormData, value: string, autoNext = true) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    if (autoNext && step < 4) {
      setStepWithDirection(step + 1);
    }
  };

  const validateStep4 = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length < 8) {
      errors.phone = "Please enter a valid contact number";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step < 4) {
      // Basic check
      if (step === 1 && !formData.serviceNeeded) {
        setValidationErrors({ serviceNeeded: "Please select a service option" });
        return;
      }
      if (step === 2 && !formData.timeline) {
        setValidationErrors({ timeline: "Please select your timeline" });
        return;
      }
      if (step === 3 && !formData.budget) {
        setValidationErrors({ budget: "Please select a budget range" });
        return;
      }
      setStepWithDirection(step + 1);
    } else {
      // Submit form
      if (validateStep4()) {
        submitLead();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStepWithDirection(step - 1);
    }
  };

  const submitLead = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setIsSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6c63ff", "#f5a623", "#111115"],
      });
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#fcfcf9] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-apex-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-apex-gold">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#111115] mt-2">
            Build Your Growth Engine
          </h2>
          <p className="text-foreground/50 text-sm max-w-sm mx-auto mt-4 leading-relaxed">
            Fill out this 4-step questionnaire, and Zaid will get back to you with a direct proposal within 24 hours.
          </p>
        </div>

        {/* Success Screen */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-foreground/5"
            >
              <div className="w-16 h-16 rounded-full bg-apex-primary/10 border border-apex-primary/20 flex items-center justify-center text-apex-primary mx-auto mb-6">
                <Check className="size-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#111115] mb-4">Project Request Submitted!</h3>
              <p className="text-foreground/60 text-xs leading-relaxed mb-6">
                Thank you for reaching out, <span className="text-foreground font-bold">{formData.name}</span>. An automated confirmation email has been dispatched to <span className="text-foreground font-semibold">{formData.email}</span>. Zaid will review your project details and follow up within 24 hours.
              </p>
              <div className="bg-[#f4f4ec] border border-foreground/5 rounded-xl p-4 mb-8 text-xs text-foreground/50 font-mono text-left max-w-sm mx-auto space-y-1">
                <div>• Service: {services.find((s) => s.id === formData.serviceNeeded)?.label || formData.serviceNeeded}</div>
                <div>• Timeline: {timelines.find((t) => t.id === formData.timeline)?.label || formData.timeline}</div>
                <div>• Budget: {budgets.find((b) => b.id === formData.budget)?.label || formData.budget}</div>
              </div>
              <Button
                onClick={() => {
                  setFormData(INITIAL_DATA);
                  setIsSuccess(false);
                  setStep(1);
                }}
                variant="outline"
                className="text-[10px] rounded-full border-foreground/10 hover:border-foreground/20 text-foreground"
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            /* Form Container */
            <motion.div
              layout
              className="glass-panel rounded-3xl p-6 md:p-10 border border-foreground/5 relative overflow-hidden"
            >
              {/* Progress Bar Header */}
              <div className="flex items-center justify-between gap-2 mb-8">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? "bg-black w-8" : i < step ? "bg-black/45" : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-foreground/40">Step {step} of 4</span>
              </div>

              {/* Steps Animation */}
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={step}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="flex flex-col gap-6"
                  >
                    {/* STEP 1: SERVICE TYPE */}
                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-base font-bold text-[#111115]">What service do you need?</h3>
                          <p className="text-[11px] text-foreground/40 mt-1">Select the option that best fits your agency requirements.</p>
                        </div>
                        {validationErrors.serviceNeeded && (
                          <div className="flex items-center gap-1.5 text-xs text-apex-accent">
                            <AlertCircle size={14} /> {validationErrors.serviceNeeded}
                          </div>
                        )}
                        <div className="flex flex-col gap-3">
                          {services.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelectOption("serviceNeeded", item.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between group cursor-pointer ${
                                formData.serviceNeeded === item.id
                                  ? "border-apex-primary bg-apex-primary/5 text-[#111115]"
                                  : "border-foreground/5 bg-white/70 hover:border-foreground/10 text-foreground/75 hover:text-[#111115]"
                              }`}
                            >
                              <div className="pr-4">
                                <div className="text-sm font-semibold">{item.label}</div>
                                <div className="text-xs text-foreground/40 mt-0.5 group-hover:text-foreground/55 transition-colors">
                                  {item.description}
                                </div>
                              </div>
                              <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                formData.serviceNeeded === item.id
                                  ? "border-apex-primary bg-apex-primary text-white"
                                  : "border-foreground/20"
                              }`}>
                                {formData.serviceNeeded === item.id && <Check size={10} />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: TIMELINE */}
                    {step === 2 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-base font-bold text-[#111115]">What is your project timeline?</h3>
                          <p className="text-[11px] text-foreground/40 mt-1">When do you need the website to be live and fully functional?</p>
                        </div>
                        {validationErrors.timeline && (
                          <div className="flex items-center gap-1.5 text-xs text-apex-accent">
                            <AlertCircle size={14} /> {validationErrors.timeline}
                          </div>
                        )}
                        <div className="flex flex-col gap-3">
                          {timelines.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelectOption("timeline", item.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between group cursor-pointer ${
                                formData.timeline === item.id
                                  ? "border-apex-primary bg-apex-primary/5 text-[#111115]"
                                  : "border-foreground/5 bg-white/70 hover:border-foreground/10 text-foreground/75 hover:text-[#111115]"
                              }`}
                            >
                              <div>
                                <div className="text-sm font-semibold">{item.label}</div>
                                <div className="text-xs text-foreground/40 mt-0.5">{item.description}</div>
                              </div>
                              <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                formData.timeline === item.id
                                  ? "border-apex-primary bg-apex-primary text-white"
                                  : "border-foreground/20"
                              }`}>
                                {formData.timeline === item.id && <Check size={10} />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: BUDGET */}
                    {step === 3 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-base font-bold text-[#111115]">What is your estimated budget?</h3>
                          <p className="text-[11px] text-foreground/40 mt-1">Pricing maps to the scope of styling, CMS, integrations, and 3D assets.</p>
                        </div>
                        {validationErrors.budget && (
                          <div className="flex items-center gap-1.5 text-xs text-apex-accent">
                            <AlertCircle size={14} /> {validationErrors.budget}
                          </div>
                        )}
                        <div className="flex flex-col gap-3">
                          {budgets.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelectOption("budget", item.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between group cursor-pointer ${
                                formData.budget === item.id
                                  ? "border-apex-primary bg-apex-primary/5 text-[#111115]"
                                  : "border-foreground/5 bg-white/70 hover:border-foreground/10 text-foreground/75 hover:text-[#111115]"
                              }`}
                            >
                              <div>
                                <div className="text-sm font-semibold">{item.label}</div>
                                <div className="text-xs text-foreground/40 mt-0.5">{item.description}</div>
                              </div>
                              <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                formData.budget === item.id
                                  ? "border-apex-primary bg-apex-primary text-white"
                                  : "border-foreground/20"
                              }`}>
                                {formData.budget === item.id && <Check size={10} />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: CONTACT DETAILS */}
                    {step === 4 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-base font-bold text-[#111115]">Tell us about yourself</h3>
                          <p className="text-[11px] text-foreground/40 mt-1">Provide your details and business profile to book the call.</p>
                        </div>

                        {submitError && (
                          <div className="bg-apex-accent/10 border border-apex-accent/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-apex-accent leading-relaxed">
                            <AlertCircle className="size-4 shrink-0 mt-0.5" />
                            <span>{submitError}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Name Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-foreground/60 uppercase" htmlFor="name">Full Name *</label>
                            <input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, name: e.target.value }));
                                setValidationErrors((prev) => ({ ...prev, name: "" }));
                              }}
                              className={`w-full bg-[#ffffff] border rounded-xl px-4 py-3 text-sm text-[#111115] placeholder-foreground/25 outline-none transition-all ${
                                validationErrors.name ? "border-apex-accent" : "border-foreground/10 focus:border-apex-primary"
                              }`}
                              placeholder="Zaid builds"
                            />
                            {validationErrors.name && (
                              <span className="text-[10px] text-apex-accent flex items-center gap-1">
                                <AlertCircle size={10} /> {validationErrors.name}
                              </span>
                            )}
                          </div>

                          {/* Business Name Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-foreground/60 uppercase" htmlFor="biz">Business Name</label>
                            <input
                              id="biz"
                              type="text"
                              value={formData.businessName}
                              onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                              className="w-full bg-[#ffffff] border border-foreground/10 focus:border-apex-primary rounded-xl px-4 py-3 text-sm text-[#111115] placeholder-foreground/25 outline-none transition-all"
                              placeholder="Apex Scaling"
                            />
                          </div>

                          {/* Email Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-foreground/60 uppercase" htmlFor="email">Email Address *</label>
                            <input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, email: e.target.value }));
                                setValidationErrors((prev) => ({ ...prev, email: "" }));
                              }}
                              className={`w-full bg-[#ffffff] border rounded-xl px-4 py-3 text-sm text-[#111115] placeholder-foreground/25 outline-none transition-all ${
                                validationErrors.email ? "border-apex-accent" : "border-foreground/10 focus:border-apex-primary"
                              }`}
                              placeholder="collab.zaidbuilds@gmail.com"
                            />
                            {validationErrors.email && (
                              <span className="text-[10px] text-apex-accent flex items-center gap-1">
                                <AlertCircle size={10} /> {validationErrors.email}
                              </span>
                            )}
                          </div>

                          {/* Phone Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-foreground/60 uppercase" htmlFor="phone">Phone / WhatsApp *</label>
                            <input
                              id="phone"
                              type="text"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, phone: e.target.value }));
                                setValidationErrors((prev) => ({ ...prev, phone: "" }));
                              }}
                              className={`w-full bg-[#ffffff] border rounded-xl px-4 py-3 text-sm text-[#111115] placeholder-foreground/25 outline-none transition-all ${
                                validationErrors.phone ? "border-apex-accent" : "border-foreground/10 focus:border-apex-primary"
                              }`}
                              placeholder="+91 73030 30707"
                            />
                            {validationErrors.phone && (
                              <span className="text-[10px] text-apex-accent flex items-center gap-1">
                                <AlertCircle size={10} /> {validationErrors.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Actions Footer */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-foreground/5 gap-4">
                <Button
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  variant="ghost"
                  className="rounded-xl px-4 border border-transparent text-foreground/60 hover:text-[#111115] hover:bg-foreground/5 font-semibold text-xs uppercase tracking-wide gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft size={14} /> Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-black hover:bg-black/90 text-white rounded-xl px-6 py-5.5 font-semibold text-xs uppercase tracking-wider gap-1.5 relative overflow-hidden cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting...
                    </>
                  ) : step === 4 ? (
                    <>
                      Submit Request <Send size={14} />
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight size={14} />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
