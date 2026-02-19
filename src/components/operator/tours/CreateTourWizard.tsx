'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FormAlert } from '@/components/auth/FormAlert';

const STEPS = [
  { id: 1, name: 'Tour Type', description: 'Single day or multi-day' },
  { id: 2, name: 'Overview', description: 'Basic tour information' },
  { id: 3, name: 'Itinerary', description: 'Daily schedule' },
  { id: 4, name: 'Pricing', description: 'Cost and participants' },
  { id: 5, name: 'Details', description: 'Inclusions and logistics' },
  { id: 6, name: 'Preview', description: 'Review and publish' },
];

// Form data types
interface TourFormData {
  title: string;
  description: string;
  targetSpecies: string[];
  date?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  duration?: number;
  pricePerPerson: string;
  minParticipants: string;
  maxParticipants: string;
  included: string;
  notIncluded: string;
}

// Validation errors type
type ValidationErrors = Partial<Record<keyof TourFormData, string>>;

export function CreateTourWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [tourType, setTourType] = useState<'single-day' | 'multi-day' | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  
  // Form data state
  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    description: '',
    targetSpecies: [],
    pricePerPerson: '',
    minParticipants: '',
    maxParticipants: '',
    included: '',
    notIncluded: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Update form data
  const updateFormData = (field: keyof TourFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validation functions
  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tour title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Tour title must be at least 10 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must not exceed 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (tourType === 'single-day') {
      if (!formData.date) {
        newErrors.date = 'Date is required';
      }
      if (!formData.startTime) {
        newErrors.startTime = 'Start time is required';
      }
      if (!formData.duration || formData.duration <= 0) {
        newErrors.duration = 'Duration must be greater than 0';
      }
    } else {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.pricePerPerson) {
      newErrors.pricePerPerson = 'Price per person is required';
    } else if (parseFloat(formData.pricePerPerson) <= 0) {
      newErrors.pricePerPerson = 'Price must be greater than 0';
    }

    if (!formData.minParticipants) {
      newErrors.minParticipants = 'Minimum participants is required';
    } else if (parseInt(formData.minParticipants) < 1) {
      newErrors.minParticipants = 'Minimum must be at least 1';
    }

    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Maximum participants is required';
    } else if (parseInt(formData.maxParticipants) < 1) {
      newErrors.maxParticipants = 'Maximum must be at least 1';
    }

    if (
      formData.minParticipants &&
      formData.maxParticipants &&
      parseInt(formData.minParticipants) > parseInt(formData.maxParticipants)
    ) {
      newErrors.maxParticipants = 'Maximum must be greater than or equal to minimum';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = true;

    if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    } else if (currentStep === 4) {
      isValid = validateStep4();
    }

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear errors when going back
      setErrors({});
    }
  };

  async function handlePublish(): Promise<void> {
    setIsPublishing(true);
    setPublishError(null);

    try {
      const response = await fetch('/api/operator/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourType, ...formData }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to publish tour');
      }

      router.push('/operator/tours');
    } catch (err) {
      setPublishError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] lg:h-[calc(100vh-theme(spacing.12))] flex flex-col max-w-5xl mx-auto">
      {/* Fixed Header - Never scrolls */}
      <div className="flex-shrink-0 pb-4">
        <h1 className="font-display text-2xl lg:text-3xl font-semibold text-[var(--color-ink)]">
          Create New Tour
        </h1>
        <p className="text-[var(--color-ink-muted)] mt-1 text-base lg:text-lg">
          Build your tour step-by-step
        </p>
      </div>

      {/* Fixed Progress Steps - Never scrolls */}
      <div className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-sm lg:text-base transition-colors duration-200 ${
                    currentStep > step.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : currentStep === step.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-ink-muted)]'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {/* Step Label - Hidden on mobile for space */}
                <div className="mt-1 text-center hidden lg:block">
                  <p className="text-xs font-medium text-[var(--color-ink)]">
                    {step.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors duration-200 ${
                    currentStep > step.id
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--color-border)]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        {/* Mobile step indicator */}
        <p className="lg:hidden text-center text-sm text-[var(--color-ink-muted)] mt-2">
          {STEPS[currentStep - 1].name}
        </p>
      </div>

      {/* Scrollable Step Content - Only this scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-4 lg:p-6 h-full">
          {currentStep === 1 && (
            <TourTypeStep tourType={tourType} setTourType={setTourType} />
          )}
          {currentStep === 2 && (
            <OverviewStep
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <ItineraryStep
              tourType={tourType}
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 4 && (
            <PricingStep
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 5 && (
            <DetailsStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 6 && <PreviewStep />}
        </div>
      </div>

      {/* Fixed Navigation Buttons - Never scrolls */}
      <div className="flex-shrink-0 flex items-center justify-between pt-4 bg-[var(--color-surface-sunken)]">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-2 px-4 lg:px-6 py-3 lg:py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium text-sm lg:text-base text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-sm text-[var(--color-ink-muted)]">
          {currentStep} / {STEPS.length}
        </div>

        {currentStep < STEPS.length ? (
          <button
            onClick={nextStep}
            disabled={currentStep === 1 && !tourType}
            className="inline-flex items-center gap-2 px-4 lg:px-6 py-3 lg:py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm lg:text-base shadow-[var(--shadow-card)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {publishError && (
              <FormAlert variant="error">{publishError}</FormAlert>
            )}
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 px-4 lg:px-6 py-3 lg:py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm lg:text-base shadow-[var(--shadow-card)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Check className="w-4 h-4 lg:w-5 lg:h-5" />
              {isPublishing ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <span className="hidden sm:inline">Publish Tour</span>
                  <span className="sm:hidden">Publish</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 1: Tour Type Selection
function TourTypeStep({
  tourType,
  setTourType,
}: {
  tourType: 'single-day' | 'multi-day' | null;
  setTourType: (type: 'single-day' | 'multi-day') => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-1">
          What type of tour are you creating?
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Choose whether this is a single-day outing or a multi-day expedition
        </p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4 content-start">
        {/* Single Day Option */}
        <button
          onClick={() => setTourType('single-day')}
          className={`p-4 lg:p-6 border-2 rounded-[var(--radius-organic)] text-left transition-all duration-200 ${
            tourType === 'single-day'
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
          }`}
        >
          <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-1">
            Single Day
          </h3>
          <p className="text-sm text-[var(--color-ink-muted)] mb-3">
            Perfect for local outings, urban birding, or day trips
          </p>
          <ul className="space-y-1 text-xs text-[var(--color-ink-muted)]">
            <li>• One date and time</li>
            <li>• Simple itinerary</li>
            <li>• Easier logistics</li>
            <li>• Lower commitment for participants</li>
          </ul>
        </button>

        {/* Multi-Day Option */}
        <button
          onClick={() => setTourType('multi-day')}
          className={`p-4 lg:p-6 border-2 rounded-[var(--radius-organic)] text-left transition-all duration-200 ${
            tourType === 'multi-day'
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
          }`}
        >
          <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-1">
            Multi-Day
          </h3>
          <p className="text-sm text-[var(--color-ink-muted)] mb-3">
            For expeditions, birding safaris, or wilderness tours
          </p>
          <ul className="space-y-1 text-xs text-[var(--color-ink-muted)]">
            <li>• Start and end dates</li>
            <li>• Day-by-day itinerary builder</li>
            <li>• Accommodation and meals</li>
            <li>• Higher revenue potential</li>
          </ul>
        </button>
      </div>
    </div>
  );
}

// Step 2: Overview
function OverviewStep({
  formData,
  errors,
  updateFormData,
}: {
  formData: TourFormData;
  errors: ValidationErrors;
  updateFormData: (field: keyof TourFormData, value: any) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-4">
        Tour Overview
      </h2>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Tour Title */}
          <div>
            <label htmlFor="tour-title" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
              Tour Title *
            </label>
            <input
              id="tour-title"
              type="text"
              placeholder="e.g., Patagonian Birding Adventure"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                errors.title
                  ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                  : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
              }`}
            />
            {errors.title && (
              <p id="title-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Target Species */}
          <div>
            <label htmlFor="target-species" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
              Target Species
            </label>
            <input
              id="target-species"
              type="text"
              placeholder="Start typing species name..."
              className="w-full px-3 py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
            />
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              eBird integration coming soon
            </p>
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="flex flex-col">
          <label htmlFor="tour-description" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
            Description *
          </label>
          <textarea
            id="tour-description"
            placeholder="Describe your tour, target species, and what makes it special..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : 'description-count'}
            className={`flex-1 min-h-[120px] w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 resize-none ${
              errors.description
                ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
            }`}
          />
          {errors.description ? (
            <p id="description-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.description}
            </p>
          ) : (
            <p id="description-count" className="text-xs text-[var(--color-ink-muted)] mt-1">
              {formData.description.length}/2000 characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 3: Itinerary
function ItineraryStep({
  tourType,
  formData,
  errors,
  updateFormData,
}: {
  tourType: 'single-day' | 'multi-day' | null;
  formData: TourFormData;
  errors: ValidationErrors;
  updateFormData: (field: keyof TourFormData, value: any) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-4">
        {tourType === 'single-day' ? 'Daily Schedule' : 'Day-by-Day Itinerary'}
      </h2>

      {tourType === 'single-day' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="tour-date" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                Date *
              </label>
              <input
                id="tour-date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => updateFormData('date', e.target.value)}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'date-error' : undefined}
                className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.date
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {errors.date && (
                <p id="date-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.date}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                Start Time *
              </label>
              <input
                id="start-time"
                type="time"
                value={formData.startTime || ''}
                onChange={(e) => updateFormData('startTime', e.target.value)}
                aria-invalid={!!errors.startTime}
                aria-describedby={errors.startTime ? 'startTime-error' : undefined}
                className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.startTime
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {errors.startTime && (
                <p id="startTime-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.startTime}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                Duration (hours) *
              </label>
              <input
                id="duration"
                type="number"
                placeholder="6"
                value={formData.duration || ''}
                onChange={(e) => updateFormData('duration', parseFloat(e.target.value))}
                aria-invalid={!!errors.duration}
                aria-describedby={errors.duration ? 'duration-error' : undefined}
                className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.duration
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {errors.duration && (
                <p id="duration-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.duration}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                Start Date *
              </label>
              <input
                id="start-date"
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => updateFormData('startDate', e.target.value)}
                aria-invalid={!!errors.startDate}
                aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.startDate
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {errors.startDate && (
                <p id="startDate-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.startDate}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                End Date *
              </label>
              <input
                id="end-date"
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => updateFormData('endDate', e.target.value)}
                aria-invalid={!!errors.endDate}
                aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.endDate
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {errors.endDate && (
                <p id="endDate-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div className="p-3 bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)]">
            <p className="text-sm text-[var(--color-ink-muted)]">
              Day-by-day itinerary builder with drag-drop reordering coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Step 4: Pricing
function PricingStep({
  formData,
  errors,
  updateFormData,
}: {
  formData: TourFormData;
  errors: ValidationErrors;
  updateFormData: (field: keyof TourFormData, value: any) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-4">
        Pricing & Participants
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price-per-person" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
              Price per Person *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]">
                $
              </span>
              <input
                id="price-per-person"
                type="number"
                placeholder="4200"
                value={formData.pricePerPerson}
                onChange={(e) => updateFormData('pricePerPerson', e.target.value)}
                aria-invalid={!!errors.pricePerPerson}
                aria-describedby={errors.pricePerPerson ? 'price-error' : undefined}
                className={`w-full pl-7 pr-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                  errors.pricePerPerson
                    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
            </div>
            {errors.pricePerPerson && (
              <p id="price-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.pricePerPerson}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="min-participants" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
              Min Participants *
            </label>
            <input
              id="min-participants"
              type="number"
              placeholder="6"
              value={formData.minParticipants}
              onChange={(e) => updateFormData('minParticipants', e.target.value)}
              aria-invalid={!!errors.minParticipants}
              aria-describedby={errors.minParticipants ? 'min-error' : 'min-help'}
              className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                errors.minParticipants
                  ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                  : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
              }`}
            />
            {errors.minParticipants ? (
              <p id="min-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.minParticipants}
              </p>
            ) : (
              <p id="min-help" className="text-xs text-[var(--color-ink-muted)] mt-1">
                Tour confirms at this number
              </p>
            )}
          </div>

          <div>
            <label htmlFor="max-participants" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
              Max Participants *
            </label>
            <input
              id="max-participants"
              type="number"
              placeholder="8"
              value={formData.maxParticipants}
              onChange={(e) => updateFormData('maxParticipants', e.target.value)}
              aria-invalid={!!errors.maxParticipants}
              aria-describedby={errors.maxParticipants ? 'max-error' : 'max-help'}
              className={`w-full px-3 py-3 border-2 rounded-[var(--radius-organic)] focus:outline-none transition-colors duration-200 ${
                errors.maxParticipants
                  ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                  : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
              }`}
            />
            {errors.maxParticipants ? (
              <p id="max-error" className="text-xs text-[var(--color-destructive)] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.maxParticipants}
              </p>
            ) : (
              <p id="max-help" className="text-xs text-[var(--color-ink-muted)] mt-1">
                Group size limit
              </p>
            )}
          </div>
        </div>

        {/* Pricing summary info box */}
        <div className="p-3 bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)] mt-2">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Quorum uses a quorum-based confirmation model. Your tour only runs if minimum participants commit. This protects both you and travelers.
          </p>
        </div>
      </div>
    </div>
  );
}

// Step 5: Details
function DetailsStep({
  formData,
  updateFormData,
}: {
  formData: TourFormData;
  updateFormData: (field: keyof TourFormData, value: any) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-4">
        Inclusions & Logistics
      </h2>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="included" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
            What's Included
          </label>
          <textarea
            id="included"
            placeholder="• All ground transportation&#10;• Accommodation (5 nights)&#10;• Breakfast and lunch daily&#10;• Expert guide services"
            value={formData.included}
            onChange={(e) => updateFormData('included', e.target.value)}
            className="flex-1 min-h-[100px] w-full px-3 py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200 resize-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="not-included" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
            What's Not Included
          </label>
          <textarea
            id="not-included"
            placeholder="• International flights&#10;• Travel insurance&#10;• Dinner and beverages&#10;• Personal equipment"
            value={formData.notIncluded}
            onChange={(e) => updateFormData('notIncluded', e.target.value)}
            className="flex-1 min-h-[100px] w-full px-3 py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// Step 6: Preview
function PreviewStep() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-xl lg:text-2xl font-semibold text-[var(--color-ink)] mb-4">
        Preview & Publish
      </h2>

      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 p-4 bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)]">
          <h3 className="font-medium text-[var(--color-ink)] mb-2">
            Tour Preview
          </h3>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Review your tour details before publishing. You can edit any section by going back.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[var(--color-info-bg)] border border-[var(--color-info-border)] rounded-[var(--radius-organic)]">
          <input
            type="checkbox"
            id="confirm-publish"
            className="w-4 h-4 flex-shrink-0"
          />
          <label htmlFor="confirm-publish" className="text-sm text-[var(--color-info-text)]">
            I confirm this tour information is accurate and ready to publish
          </label>
        </div>
      </div>
    </div>
  );
}
